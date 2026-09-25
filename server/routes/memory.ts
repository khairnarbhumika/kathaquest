import { Router } from 'express';
import { MemoryCompleteSchema } from '../../shared/schemas.js';
import { query } from '../db/index.js';
import { awardPlayerXp } from '../services/gameService.js';

const router = Router();

// List memory decks
router.get('/decks', async (req, res, next) => {
  try {
    const decksRes = await query(
      `SELECT md.id, md.slug, md.category_slug as "categorySlug", md.title, md.description, md.difficulty,
              COUNT(mc.id) / 2 as "pairCount"
       FROM memory_decks md
       LEFT JOIN memory_cards mc ON md.id = mc.id
       WHERE md.published = true
       GROUP BY md.id
       ORDER BY md.title ASC`
    );

    res.json({ decks: decksRes.rows });
  } catch (err) {
    next(err);
  }
});

// Get single deck and shuffled cards
router.get('/decks/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params;
    const playerId = req.playerSessionId;

    const deckRes = await query(
      `SELECT id, slug, category_slug as "categorySlug", title, description, difficulty
       FROM memory_decks WHERE slug = $1 AND published = true`,
      [slug]
    );

    if (deckRes.rows.length === 0) {
      return res.status(404).json({ error: 'Memory deck not found' });
    }

    const deck = deckRes.rows[0];

    const cardsRes = await query(
      `SELECT id, deck_id as "deckId", pair_key as "pairKey", face_text as "faceText",
              accessible_description as "accessibleDescription", display_order as "displayOrder"
       FROM memory_cards WHERE deck_id = $1 ORDER BY RANDOM()`,
      [deck.id]
    );

    // Create game session record
    const sessionRes = await query(
      `INSERT INTO game_sessions (player_session_id, game_type, category_slug, status)
       VALUES ($1, 'memory', $2, 'in_progress')
       RETURNING id, started_at`,
      [playerId, deck.categorySlug]
    );

    res.json({
      gameSessionId: sessionRes.rows[0].id,
      deck,
      cards: cardsRes.rows,
    });
  } catch (err) {
    next(err);
  }
});

// Complete memory game
router.post('/complete', async (req, res, next) => {
  try {
    const input = MemoryCompleteSchema.parse(req.body);
    const playerId = req.playerSessionId;

    // Verify game session
    const gsRes = await query(
      `SELECT id, status FROM game_sessions WHERE id = $1 AND player_session_id = $2`,
      [input.gameSessionId, playerId]
    );

    if (gsRes.rows.length === 0) {
      return res.status(404).json({ error: 'Game session not found' });
    }

    const gameSession = gsRes.rows[0];
    if (gameSession.status === 'completed') {
      return res.status(400).json({ error: 'Memory game is already completed' });
    }

    // Insert memory_results
    await query(
      `INSERT INTO memory_results (game_session_id, player_session_id, deck_id, pair_count, moves, elapsed_ms)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (game_session_id) DO NOTHING`,
      [input.gameSessionId, playerId, input.deckId, input.pairCount, input.moves, input.elapsedMs]
    );

    // Calculate XP: Base 40 XP + Efficiency Bonus if moves <= 1.5 * pairCount
    let earnedXp = 40;
    if (input.moves <= Math.ceil(input.pairCount * 1.5)) {
      earnedXp += 25; // Perfect move bonus
    }

    await query(
      `UPDATE game_sessions
       SET status = 'completed', score = $1, xp_awarded = $2, completed_at = now()
       WHERE id = $3`,
      [100, earnedXp, input.gameSessionId]
    );

    const xpResult = await awardPlayerXp(playerId, earnedXp, 'memory');

    res.json({
      gameSessionId: input.gameSessionId,
      status: 'completed',
      moves: input.moves,
      elapsedMs: input.elapsedMs,
      xpAwarded: earnedXp,
      totalXp: xpResult.totalXp,
      newAchievements: xpResult.newAchievements,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
