import { query, withTransaction } from '../db/index.js';

export async function awardPlayerXp(
  playerSessionId: string,
  additionalXp: number,
  gameType: 'quiz' | 'memory' | 'story'
): Promise<{ totalXp: number; newAchievements: string[] }> {
  return await withTransaction(playerSessionId, async (dbQuery) => {
    // 1. Update player stats
    let quizInc = gameType === 'quiz' ? 1 : 0;
    let memInc = gameType === 'memory' ? 1 : 0;
    let storyInc = gameType === 'story' ? 1 : 0;

    const statsRes = await dbQuery(
      `INSERT INTO player_stats (player_session_id, total_xp, quizzes_completed, memory_games_completed, stories_completed)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (player_session_id) DO UPDATE SET
         total_xp = player_stats.total_xp + EXCLUDED.total_xp,
         quizzes_completed = player_stats.quizzes_completed + $3,
         memory_games_completed = player_stats.memory_games_completed + $4,
         stories_completed = player_stats.stories_completed + $5,
         updated_at = now()
       RETURNING total_xp, quizzes_completed, memory_games_completed, stories_completed`,
      [playerSessionId, additionalXp, quizInc, memInc, storyInc]
    );

    const stats = statsRes.rows[0];
    const totalXp = stats.total_xp;

    // 2. Check and award achievements
    const newAchievements: string[] = [];

    // Rule 1: first-step
    await tryAwardAchievement(dbQuery, playerSessionId, 'first-step', newAchievements);

    // Rule 2: quiz-scholar (3 quizzes completed)
    if (stats.quizzes_completed >= 3) {
      await tryAwardAchievement(dbQuery, playerSessionId, 'quiz-scholar', newAchievements);
    }

    // Rule 3: memory-maestro (1 memory game)
    if (stats.memory_games_completed >= 1) {
      await tryAwardAchievement(dbQuery, playerSessionId, 'memory-maestro', newAchievements);
    }

    // Rule 4: epic-explorer (1 story completed)
    if (stats.stories_completed >= 1) {
      await tryAwardAchievement(dbQuery, playerSessionId, 'epic-explorer', newAchievements);
    }

    // Rule 5: century-xp (100 total XP)
    if (totalXp >= 100) {
      await tryAwardAchievement(dbQuery, playerSessionId, 'century-xp', newAchievements);
    }

    return { totalXp, newAchievements };
  });
}

async function tryAwardAchievement(
  dbQuery: Function,
  playerSessionId: string,
  achievementSlug: string,
  newAchievementsList: string[]
) {
  const insertRes = await dbQuery(
    `INSERT INTO player_achievements (player_session_id, achievement_slug)
     VALUES ($1, $2)
     ON CONFLICT DO NOTHING
     RETURNING achievement_slug`,
    [playerSessionId, achievementSlug]
  );
  if (insertRes.rows.length > 0) {
    newAchievementsList.push(achievementSlug);
  }
}
