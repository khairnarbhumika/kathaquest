import { Router } from 'express';
import { query } from '../db/index.js';

const router = Router();

// Get player progress, total XP, achievements, activity history, and category mastery
router.get('/progress', async (req, res, next) => {
  try {
    const playerId = req.playerSessionId;

    // 1. Fetch player stats
    const statsRes = await query(
      `SELECT player_session_id as "playerSessionId", total_xp as "totalXp",
              quizzes_completed as "quizzesCompleted", memory_games_completed as "memoryGamesCompleted",
              stories_completed as "storiesCompleted", updated_at as "updatedAt"
       FROM player_stats WHERE player_session_id = $1`,
      [playerId]
    );

    const stats = statsRes.rows[0] || {
      playerSessionId: playerId,
      totalXp: 0,
      quizzesCompleted: 0,
      memoryGamesCompleted: 0,
      storiesCompleted: 0,
      updatedAt: new Date().toISOString(),
    };

    // 2. Fetch all achievements with earned status
    const achievementsRes = await query(
      `SELECT a.slug, a.title, a.description, a.icon_key as "iconKey", a.rule_key as "ruleKey",
              pa.earned_at as "earnedAt"
       FROM achievements a
       LEFT JOIN player_achievements pa ON a.slug = pa.achievement_slug AND pa.player_session_id = $1
       ORDER BY a.title ASC`,
      [playerId]
    );

    // 3. Fetch recent activity history (last 10 completed game sessions)
    const historyRes = await query(
      `SELECT id, game_type as "gameType", category_slug as "categorySlug", score,
              xp_awarded as "xpAwarded", completed_at as "completedAt"
       FROM game_sessions
       WHERE player_session_id = $1 AND status = 'completed'
       ORDER BY completed_at DESC LIMIT 10`,
      [playerId]
    );

    // 4. Calculate category mastery stats
    const categoryMasteryRes = await query(
      `SELECT cc.slug as "categorySlug", cc.name as "categoryName", cc.content_type as "contentType",
              COALESCE(COUNT(qa.id), 0) as "totalAnswered",
              COALESCE(SUM(CASE WHEN qa.is_correct THEN 1 ELSE 0 END), 0) as "correctAnswers"
       FROM content_categories cc
       LEFT JOIN quiz_questions qq ON cc.slug = qq.category_slug
       LEFT JOIN quiz_attempts qa ON qq.id = qa.question_id AND qa.player_session_id = $1
       GROUP BY cc.slug, cc.name, cc.content_type, cc.display_order
       ORDER BY cc.display_order ASC`,
      [playerId]
    );

    const categoryMastery = categoryMasteryRes.rows.map((cm) => {
      const totalAnswered = parseInt(cm.totalAnswered, 10);
      const correctAnswers = parseInt(cm.correctAnswers, 10);
      const masteryPercentage = totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0;
      return {
        categorySlug: cm.categorySlug,
        categoryName: cm.categoryName,
        contentType: cm.contentType,
        quizzesTaken: totalAnswered,
        correctAnswers,
        totalQuestions: totalAnswered,
        masteryPercentage,
      };
    });

    res.json({
      stats,
      achievements: achievementsRes.rows,
      recentActivities: historyRes.rows,
      categoryMastery,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
