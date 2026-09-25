import fs from 'fs';
import path from 'path';
import { initDb, query, withTransaction } from './index.js';
import {
  SEED_CATEGORIES,
  SEED_ACHIEVEMENTS,
  SEED_LESSONS,
  SEED_QUESTIONS,
  SEED_MEMORY_DECKS,
  SEED_STORIES,
} from './seedData.js';

export async function runMigrationsAndSeed() {
  console.log('--- Starting KathaQuest Database Migration & Seeding ---');
  await initDb();

  // Read schema SQL
  const schemaPath = path.resolve(process.cwd(), 'server/db/schema.sql');
  if (fs.existsSync(schemaPath)) {
    console.log('Executing schema.sql DDL...');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    // Split by statement if needed or execute raw sql
    try {
      await query(schemaSql);
      console.log('Schema DDL executed successfully.');
    } catch (err: any) {
      console.warn('Note during schema execution:', err.message);
    }
  }

  await withTransaction(null, async (dbQuery) => {
    // 1. Seed Categories
    console.log('Seeding Content Categories...');
    for (const cat of SEED_CATEGORIES) {
      await dbQuery(
        `INSERT INTO content_categories (slug, name, content_type, description, display_order)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (slug) DO UPDATE SET
           name = EXCLUDED.name,
           content_type = EXCLUDED.content_type,
           description = EXCLUDED.description,
           display_order = EXCLUDED.display_order`,
        [cat.slug, cat.name, cat.content_type, cat.description, cat.display_order]
      );
    }

    // 2. Seed Achievements
    console.log('Seeding Achievements...');
    for (const ach of SEED_ACHIEVEMENTS) {
      await dbQuery(
        `INSERT INTO achievements (slug, title, description, icon_key, rule_key)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (slug) DO UPDATE SET
           title = EXCLUDED.title,
           description = EXCLUDED.description,
           icon_key = EXCLUDED.icon_key`,
        [ach.slug, ach.title, ach.description, ach.icon_key, ach.rule_key]
      );
    }

    // 3. Seed Lessons
    console.log('Seeding Educational Lessons...');
    for (const lesson of SEED_LESSONS) {
      await dbQuery(
        `INSERT INTO lessons (slug, category_slug, title, summary, body_markdown, reading_minutes, difficulty, source_refs)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb)
         ON CONFLICT (slug) DO UPDATE SET
           title = EXCLUDED.title,
           summary = EXCLUDED.summary,
           body_markdown = EXCLUDED.body_markdown,
           reading_minutes = EXCLUDED.reading_minutes,
           difficulty = EXCLUDED.difficulty,
           source_refs = EXCLUDED.source_refs`,
        [
          lesson.slug,
          lesson.category_slug,
          lesson.title,
          lesson.summary,
          lesson.body_markdown,
          lesson.reading_minutes,
          lesson.difficulty,
          JSON.stringify(lesson.source_refs),
        ]
      );
    }

    // 4. Seed Quiz Questions (36 total)
    console.log('Seeding Quiz Questions (36 items)...');
    for (const q of SEED_QUESTIONS) {
      await dbQuery(
        `INSERT INTO quiz_questions (slug, category_slug, difficulty, prompt, options, correct_index, explanation, source_refs)
         VALUES ($1, $2, $3, $4, $5::jsonb, $6, $7, $8::jsonb)
         ON CONFLICT (slug) DO UPDATE SET
           prompt = EXCLUDED.prompt,
           options = EXCLUDED.options,
           correct_index = EXCLUDED.correct_index,
           explanation = EXCLUDED.explanation,
           source_refs = EXCLUDED.source_refs`,
        [
          q.slug,
          q.category_slug,
          q.difficulty,
          q.prompt,
          JSON.stringify(q.options),
          q.correct_index,
          q.explanation,
          JSON.stringify(q.source_refs),
        ]
      );
    }

    // 5. Seed Memory Decks & Cards
    console.log('Seeding Memory Decks & Cards...');
    for (const deck of SEED_MEMORY_DECKS) {
      const deckRes = await dbQuery(
        `INSERT INTO memory_decks (slug, category_slug, title, description, difficulty)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (slug) DO UPDATE SET
           title = EXCLUDED.title,
           description = EXCLUDED.description
         RETURNING id`,
        [deck.slug, deck.category_slug, deck.title, deck.description, deck.difficulty]
      );
      const deckId = deckRes.rows[0].id;

      // Delete old cards and re-insert
      await dbQuery(`DELETE FROM memory_cards WHERE deck_id = $1`, [deckId]);
      for (let i = 0; i < deck.cards.length; i++) {
        const card = deck.cards[i];
        await dbQuery(
          `INSERT INTO memory_cards (deck_id, pair_key, face_text, accessible_description, display_order)
           VALUES ($1, $2, $3, $4, $5)`,
          [deckId, card.pair_key, card.face_text, card.accessible_description, i + 1]
        );
      }
    }

    // 6. Seed Stories & Story Chapters
    console.log('Seeding Interactive Stories & Chapters...');
    for (const story of SEED_STORIES) {
      const storyRes = await dbQuery(
        `INSERT INTO stories (slug, category_slug, title, description, tradition_note, reading_minutes, source_refs)
         VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb)
         ON CONFLICT (slug) DO UPDATE SET
           title = EXCLUDED.title,
           description = EXCLUDED.description,
           tradition_note = EXCLUDED.tradition_note,
           reading_minutes = EXCLUDED.reading_minutes,
           source_refs = EXCLUDED.source_refs
         RETURNING id`,
        [
          story.slug,
          story.category_slug,
          story.title,
          story.description,
          story.tradition_note,
          story.reading_minutes,
          JSON.stringify(story.source_refs),
        ]
      );
      const storyId = storyRes.rows[0].id;

      await dbQuery(`DELETE FROM story_chapters WHERE story_id = $1`, [storyId]);
      for (const ch of story.chapters) {
        await dbQuery(
          `INSERT INTO story_chapters (story_id, chapter_number, title, body_markdown, choices, reflection_prompt)
           VALUES ($1, $2, $3, $4, $5::jsonb, $6)`,
          [
            storyId,
            ch.chapter_number,
            ch.title,
            ch.body_markdown,
            JSON.stringify(ch.choices),
            ch.reflection_prompt || null,
          ]
        );
      }
    }
  });

  console.log('--- KathaQuest Database Migration & Seeding Completed Successfully ---');
}

// Allow direct CLI invocation
if (process.argv[1]?.endsWith('seed.ts') || process.argv[1]?.endsWith('seed.js')) {
  runMigrationsAndSeed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Seed execution error:', err);
      process.exit(1);
    });
}
