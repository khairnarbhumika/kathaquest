import { Router } from 'express';
import { StoryProgressSchema } from '../../shared/schemas.js';
import { query } from '../db/index.js';
import { awardPlayerXp } from '../services/gameService.js';

const router = Router();

// List stories
router.get('/', async (req, res, next) => {
  try {
    const storiesRes = await query(
      `SELECT s.id, s.slug, s.category_slug as "categorySlug", s.title, s.description,
              s.tradition_note as "traditionNote", s.reading_minutes as "readingMinutes",
              s.source_refs as "sourceRefs", COUNT(sc.id) as "chapterCount"
       FROM stories s
       LEFT JOIN story_chapters sc ON s.id = sc.story_id
       WHERE s.published = true
       GROUP BY s.id
       ORDER BY s.title ASC`
    );

    const stories = storiesRes.rows.map((s) => ({
      ...s,
      sourceRefs: typeof s.sourceRefs === 'string' ? JSON.parse(s.sourceRefs) : s.sourceRefs,
      chapterCount: parseInt(s.chapterCount, 10),
    }));

    res.json({ stories });
  } catch (err) {
    next(err);
  }
});

// Story details & saved reading progress
router.get('/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params;
    const playerId = req.playerSessionId;

    const storyRes = await query(
      `SELECT id, slug, category_slug as "categorySlug", title, description,
              tradition_note as "traditionNote", reading_minutes as "readingMinutes", source_refs as "sourceRefs"
       FROM stories WHERE slug = $1 AND published = true`,
      [slug]
    );

    if (storyRes.rows.length === 0) {
      return res.status(404).json({ error: 'Story not found' });
    }

    const story = storyRes.rows[0];
    story.sourceRefs = typeof story.sourceRefs === 'string' ? JSON.parse(story.sourceRefs) : story.sourceRefs;

    // Get chapters
    const chaptersRes = await query(
      `SELECT id, story_id as "storyId", chapter_number as "chapterNumber", title,
              body_markdown as "bodyMarkdown", choices, reflection_prompt as "reflectionPrompt"
       FROM story_chapters WHERE story_id = $1 ORDER BY chapter_number ASC`,
      [story.id]
    );

    const chapters = chaptersRes.rows.map((ch) => ({
      ...ch,
      choices: typeof ch.choices === 'string' ? JSON.parse(ch.choices) : ch.choices,
    }));

    // Check player saved progress
    const progressRes = await query(
      `SELECT current_chapter_id as "currentChapterId", completed_at as "completedAt"
       FROM story_progress WHERE player_session_id = $1 AND story_id = $2`,
      [playerId, story.id]
    );

    const progress = progressRes.rows[0] || null;

    res.json({
      story,
      chapters,
      progress,
    });
  } catch (err) {
    next(err);
  }
});

// Update story progress or choice selection
router.post('/:slug/progress', async (req, res, next) => {
  try {
    const { slug } = req.params;
    const playerId = req.playerSessionId;
    const input = StoryProgressSchema.parse(req.body);

    const storyRes = await query(
      `SELECT id FROM stories WHERE slug = $1 AND published = true`,
      [slug]
    );

    if (storyRes.rows.length === 0) {
      return res.status(404).json({ error: 'Story not found' });
    }

    const storyId = storyRes.rows[0].id;
    const isCompleted = input.completed === true;
    const completedAtVal = isCompleted ? new Date().toISOString() : null;

    await query(
      `INSERT INTO story_progress (player_session_id, story_id, current_chapter_id, completed_at, updated_at)
       VALUES ($1, $2, $3, $4, now())
       ON CONFLICT (player_session_id, story_id) DO UPDATE SET
         current_chapter_id = COALESCE(EXCLUDED.current_chapter_id, story_progress.current_chapter_id),
         completed_at = COALESCE(EXCLUDED.completed_at, story_progress.completed_at),
         updated_at = now()`,
      [playerId, storyId, input.chapterId || null, completedAtVal]
    );

    let newAchievements: string[] = [];
    let xpAwarded = 0;

    if (isCompleted) {
      xpAwarded = 35; // 35 XP for finishing story
      const xpResult = await awardPlayerXp(playerId, xpAwarded, 'story');
      newAchievements = xpResult.newAchievements;
    }

    res.json({
      success: true,
      storyId,
      chapterId: input.chapterId,
      completed: isCompleted,
      xpAwarded,
      newAchievements,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
