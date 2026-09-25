import { Router } from 'express';
import { query } from '../db/index.js';

const router = Router();

// List lessons with category and difficulty search filter
router.get('/', async (req, res, next) => {
  try {
    const { category, difficulty, search } = req.query;

    let sql = `SELECT id, slug, category_slug as "categorySlug", title, summary,
                      reading_minutes as "readingMinutes", difficulty, source_refs as "sourceRefs", created_at as "createdAt"
               FROM lessons WHERE published = true`;
    const params: any[] = [];

    if (category && category !== 'all') {
      params.push(category);
      sql += ` AND category_slug = $${params.length}`;
    }

    if (difficulty) {
      params.push(difficulty);
      sql += ` AND difficulty = $${params.length}`;
    }

    if (search && typeof search === 'string' && search.trim() !== '') {
      params.push(`%${search.trim()}%`);
      sql += ` AND (title ILIKE $${params.length} OR summary ILIKE $${params.length})`;
    }

    sql += ` ORDER BY title ASC`;

    const lessonsRes = await query(sql, params);

    const lessons = lessonsRes.rows.map((l) => ({
      ...l,
      sourceRefs: typeof l.sourceRefs === 'string' ? JSON.parse(l.sourceRefs) : l.sourceRefs,
    }));

    res.json({ lessons });
  } catch (err) {
    next(err);
  }
});

// Get single lesson details & related questions
router.get('/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params;

    const lessonRes = await query(
      `SELECT id, slug, category_slug as "categorySlug", title, summary, body_markdown as "bodyMarkdown",
              reading_minutes as "readingMinutes", difficulty, source_refs as "sourceRefs", created_at as "createdAt"
       FROM lessons WHERE slug = $1 AND published = true`,
      [slug]
    );

    if (lessonRes.rows.length === 0) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    const lesson = lessonRes.rows[0];
    lesson.sourceRefs = typeof lesson.sourceRefs === 'string' ? JSON.parse(lesson.sourceRefs) : lesson.sourceRefs;

    // Fetch related questions in same category
    const questionsRes = await query(
      `SELECT id, slug, prompt, difficulty FROM quiz_questions
       WHERE category_slug = $1 AND active = true LIMIT 3`,
      [lesson.categorySlug]
    );

    res.json({
      lesson,
      relatedQuestions: questionsRes.rows,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
