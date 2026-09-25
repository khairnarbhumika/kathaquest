import { Router } from 'express';
import { FeedbackSubmitSchema } from '../../shared/schemas.js';
import { query } from '../db/index.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const input = FeedbackSubmitSchema.parse(req.body);
    const playerId = req.playerSessionId;

    const feedbackRes = await query(
      `INSERT INTO content_feedback (player_session_id, content_kind, content_slug, message)
       VALUES ($1, $2, $3, $4)
       RETURNING id, created_at`,
      [playerId, input.contentKind, input.contentSlug, input.message]
    );

    res.json({
      success: true,
      feedbackId: feedbackRes.rows[0].id,
      createdAt: feedbackRes.rows[0].created_at,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
