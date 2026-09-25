import { Router } from 'express';
import { QuizSetupSchema, AnswerSubmitSchema, HintRequestSchema } from '../../shared/schemas.js';
import { query, withTransaction } from '../db/index.js';
import { generateQuestionHint } from '../ai/hintGenerator.js';
import { awardPlayerXp } from '../services/gameService.js';

const router = Router();

// Create new quiz session
router.post('/session', async (req, res, next) => {
  try {
    const input = QuizSetupSchema.parse(req.body);
    const playerId = req.playerSessionId;

    let sql = `SELECT id, slug, category_slug, difficulty, prompt, options, source_refs
               FROM quiz_questions WHERE active = true`;
    const params: any[] = [];

    if (input.categorySlug !== 'all') {
      params.push(input.categorySlug);
      sql += ` AND category_slug = $${params.length}`;
    }

    if (input.difficulty) {
      params.push(input.difficulty);
      sql += ` AND difficulty = $${params.length}`;
    }

    sql += ` ORDER BY RANDOM() LIMIT $${params.length + 1}`;
    params.push(input.questionCount);

    let questionsRes = await query(sql, params);

    // Fallback if not enough difficulty-matched questions exist
    if (questionsRes.rows.length < input.questionCount && input.categorySlug !== 'all') {
      const fallbackParams: any[] = [input.categorySlug, input.questionCount];
      questionsRes = await query(
        `SELECT id, slug, category_slug, difficulty, prompt, options, source_refs
         FROM quiz_questions WHERE active = true AND category_slug = $1
         ORDER BY RANDOM() LIMIT $2`,
        fallbackParams
      );
    }

    // Insert game_sessions record
    const categoryVal = input.categorySlug === 'all' ? null : input.categorySlug;
    const sessionRes = await query(
      `INSERT INTO game_sessions (player_session_id, game_type, category_slug, status, score, xp_awarded)
       VALUES ($1, 'quiz', $2, 'in_progress', 0, 0)
       RETURNING id, started_at`,
      [playerId, categoryVal]
    );

    const gameSession = sessionRes.rows[0];

    // Format sanitized questions (hide correct_index and explanation until answered)
    const sanitizedQuestions = questionsRes.rows.map((q) => ({
      id: q.id,
      slug: q.slug,
      categorySlug: q.category_slug,
      difficulty: q.difficulty,
      prompt: q.prompt,
      options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options,
      sourceRefs: typeof q.source_refs === 'string' ? JSON.parse(q.source_refs) : q.source_refs,
    }));

    res.json({
      gameSessionId: gameSession.id,
      questions: sanitizedQuestions,
      enableTimer: input.enableTimer,
      startedAt: gameSession.started_at,
    });
  } catch (err) {
    next(err);
  }
});

// Submit answer for single question
router.post('/submit-answer', async (req, res, next) => {
  try {
    const input = AnswerSubmitSchema.parse(req.body);
    const playerId = req.playerSessionId;

    // Verify game session belongs to player
    const gsRes = await query(
      `SELECT id, status, score FROM game_sessions WHERE id = $1 AND player_session_id = $2`,
      [input.gameSessionId, playerId]
    );

    if (gsRes.rows.length === 0) {
      return res.status(404).json({ error: 'Game session not found' });
    }

    const gameSession = gsRes.rows[0];
    if (gameSession.status === 'completed') {
      return res.status(400).json({ error: 'Game session is already completed' });
    }

    // Check question details
    const qRes = await query(
      `SELECT id, correct_index, explanation, source_refs FROM quiz_questions WHERE id = $1`,
      [input.questionId]
    );

    if (qRes.rows.length === 0) {
      return res.status(404).json({ error: 'Question not found' });
    }

    const question = qRes.rows[0];
    const isCorrect = input.selectedIndex === question.correct_index;

    // Record quiz attempt
    await query(
      `INSERT INTO quiz_attempts (game_session_id, player_session_id, question_id, selected_index, is_correct, elapsed_ms)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (game_session_id, question_id) DO NOTHING`,
      [input.gameSessionId, playerId, input.questionId, input.selectedIndex, isCorrect, input.elapsedMs || null]
    );

    // Update game session score if correct
    let addedScore = 0;
    if (isCorrect) {
      addedScore = 10;
      await query(
        `UPDATE game_sessions SET score = score + $1 WHERE id = $2`,
        [addedScore, input.gameSessionId]
      );
    }

    const explanation = question.explanation;
    const sourceRefs = typeof question.source_refs === 'string' ? JSON.parse(question.source_refs) : question.source_refs;

    res.json({
      isCorrect,
      correctIndex: question.correct_index,
      explanation,
      sourceRefs,
      pointsEarned: addedScore,
    });
  } catch (err) {
    next(err);
  }
});

// Finalize and fetch quiz summary results
router.get('/results/:sessionId', async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const playerId = req.playerSessionId;

    const gsRes = await query(
      `SELECT id, category_slug, status, score, xp_awarded, started_at, completed_at
       FROM game_sessions WHERE id = $1 AND player_session_id = $2`,
      [sessionId, playerId]
    );

    if (gsRes.rows.length === 0) {
      return res.status(404).json({ error: 'Quiz session not found' });
    }

    let gameSession = gsRes.rows[0];

    // Fetch all attempts for this quiz session
    const attemptsRes = await query(
      `SELECT qa.question_id, qa.selected_index, qa.is_correct, qa.elapsed_ms,
              qq.prompt, qq.options, qq.correct_index, qq.explanation, qq.category_slug, qq.source_refs
       FROM quiz_attempts qa
       JOIN quiz_questions qq ON qa.question_id = qq.id
       WHERE qa.game_session_id = $1`,
      [sessionId]
    );

    const totalQuestions = attemptsRes.rows.length;
    const correctCount = attemptsRes.rows.filter((a) => a.is_correct).length;
    const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    let newAchievements: string[] = [];

    // Finalize session if still in progress
    if (gameSession.status === 'in_progress' && totalQuestions > 0) {
      // Calculate XP: 10 XP per correct answer + bonus for accuracy > 80%
      let earnedXp = correctCount * 10;
      if (accuracy >= 80) earnedXp += 20;

      await query(
        `UPDATE game_sessions SET status = 'completed', xp_awarded = $1, completed_at = now() WHERE id = $2`,
        [earnedXp, sessionId]
      );

      const xpResult = await awardPlayerXp(playerId, earnedXp, 'quiz');
      newAchievements = xpResult.newAchievements;
      gameSession.xp_awarded = earnedXp;
      gameSession.status = 'completed';
    }

    const attempts = attemptsRes.rows.map((a) => ({
      questionId: a.question_id,
      prompt: a.prompt,
      options: typeof a.options === 'string' ? JSON.parse(a.options) : a.options,
      selectedIndex: a.selected_index,
      correctIndex: a.correct_index,
      isCorrect: a.is_correct,
      explanation: a.explanation,
      sourceRefs: typeof a.source_refs === 'string' ? JSON.parse(a.source_refs) : a.source_refs,
    }));

    res.json({
      gameSessionId: sessionId,
      categorySlug: gameSession.category_slug,
      status: gameSession.status,
      score: gameSession.score,
      xpAwarded: gameSession.xp_awarded,
      totalQuestions,
      correctCount,
      accuracy,
      newAchievements,
      attempts,
    });
  } catch (err) {
    next(err);
  }
});

// AI Hint endpoint
router.post('/hint', async (req, res, next) => {
  try {
    const { questionId } = HintRequestSchema.parse(req.body);
    const hintData = await generateQuestionHint(questionId);
    res.json(hintData);
  } catch (err) {
    next(err);
  }
});

export default router;
