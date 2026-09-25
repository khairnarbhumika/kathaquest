CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Player Sessions
CREATE TABLE IF NOT EXISTS player_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token_hash TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at TIMESTAMPTZ NOT NULL,
    revoked_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS player_sessions_expiry_idx ON player_sessions (expires_at) WHERE revoked_at IS NULL;

-- Content Categories
CREATE TABLE IF NOT EXISTS content_categories (
    slug TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    content_type TEXT NOT NULL CHECK (content_type IN ('history', 'epic_tradition', 'culture')),
    description TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0
);

-- Lessons
CREATE TABLE IF NOT EXISTS lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    category_slug TEXT NOT NULL REFERENCES content_categories(slug),
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    body_markdown TEXT NOT NULL,
    reading_minutes INTEGER NOT NULL CHECK (reading_minutes BETWEEN 1 AND 60),
    difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    source_refs JSONB NOT NULL DEFAULT '[]'::jsonb,
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Quiz Questions
CREATE TABLE IF NOT EXISTS quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    category_slug TEXT NOT NULL REFERENCES content_categories(slug),
    difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    prompt TEXT NOT NULL,
    options JSONB NOT NULL CHECK (jsonb_typeof(options) = 'array' AND jsonb_array_length(options) = 4),
    correct_index SMALLINT NOT NULL CHECK (correct_index BETWEEN 0 AND 3),
    explanation TEXT NOT NULL,
    source_refs JSONB NOT NULL DEFAULT '[]'::jsonb,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Memory Decks & Cards
CREATE TABLE IF NOT EXISTS memory_decks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    category_slug TEXT NOT NULL REFERENCES content_categories(slug),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS memory_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    deck_id UUID NOT NULL REFERENCES memory_decks(id) ON DELETE CASCADE,
    pair_key TEXT NOT NULL,
    face_text TEXT NOT NULL,
    accessible_description TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    UNIQUE(deck_id, pair_key, face_text)
);

-- Stories & Chapters
CREATE TABLE IF NOT EXISTS stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    category_slug TEXT NOT NULL REFERENCES content_categories(slug),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tradition_note TEXT NOT NULL,
    reading_minutes INTEGER NOT NULL CHECK (reading_minutes BETWEEN 1 AND 180),
    source_refs JSONB NOT NULL DEFAULT '[]'::jsonb,
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS story_chapters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
    chapter_number INTEGER NOT NULL CHECK (chapter_number > 0),
    title TEXT NOT NULL,
    body_markdown TEXT NOT NULL,
    choices JSONB NOT NULL DEFAULT '[]'::jsonb,
    reflection_prompt TEXT,
    UNIQUE(story_id, chapter_number)
);

-- Gameplay & Session Tracking
CREATE TABLE IF NOT EXISTS game_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_session_id UUID NOT NULL REFERENCES player_sessions(id) ON DELETE CASCADE,
    game_type TEXT NOT NULL CHECK (game_type IN ('quiz', 'memory')),
    category_slug TEXT REFERENCES content_categories(slug),
    status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
    score INTEGER NOT NULL DEFAULT 0 CHECK (score >= 0),
    xp_awarded INTEGER NOT NULL DEFAULT 0 CHECK (xp_awarded >= 0),
    started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    completed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    game_session_id UUID NOT NULL,
    player_session_id UUID NOT NULL,
    question_id UUID NOT NULL REFERENCES quiz_questions(id),
    selected_index SMALLINT NOT NULL CHECK (selected_index BETWEEN 0 AND 3),
    is_correct BOOLEAN NOT NULL,
    elapsed_ms INTEGER CHECK (elapsed_ms IS NULL OR elapsed_ms >= 0),
    answered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    FOREIGN KEY (game_session_id) REFERENCES game_sessions(id) ON DELETE CASCADE,
    UNIQUE (game_session_id, question_id)
);

CREATE TABLE IF NOT EXISTS memory_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    game_session_id UUID NOT NULL REFERENCES game_sessions(id) ON DELETE CASCADE,
    player_session_id UUID NOT NULL REFERENCES player_sessions(id) ON DELETE CASCADE,
    deck_id UUID NOT NULL REFERENCES memory_decks(id),
    pair_count SMALLINT NOT NULL CHECK (pair_count > 0),
    moves INTEGER NOT NULL CHECK (moves >= pair_count),
    elapsed_ms INTEGER NOT NULL CHECK (elapsed_ms >= 0),
    completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(game_session_id)
);

CREATE TABLE IF NOT EXISTS story_progress (
    player_session_id UUID NOT NULL REFERENCES player_sessions(id) ON DELETE CASCADE,
    story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
    current_chapter_id UUID REFERENCES story_chapters(id),
    completed_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (player_session_id, story_id)
);

CREATE TABLE IF NOT EXISTS player_stats (
    player_session_id UUID PRIMARY KEY REFERENCES player_sessions(id) ON DELETE CASCADE,
    total_xp INTEGER NOT NULL DEFAULT 0 CHECK (total_xp >= 0),
    quizzes_completed INTEGER NOT NULL DEFAULT 0 CHECK (quizzes_completed >= 0),
    memory_games_completed INTEGER NOT NULL DEFAULT 0 CHECK (memory_games_completed >= 0),
    stories_completed INTEGER NOT NULL DEFAULT 0 CHECK (stories_completed >= 0),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS achievements (
    slug TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_key TEXT NOT NULL,
    rule_key TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS player_achievements (
    player_session_id UUID NOT NULL REFERENCES player_sessions(id) ON DELETE CASCADE,
    achievement_slug TEXT NOT NULL REFERENCES achievements(slug),
    earned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (player_session_id, achievement_slug)
);

CREATE TABLE IF NOT EXISTS content_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_session_id UUID NOT NULL REFERENCES player_sessions(id) ON DELETE CASCADE,
    content_kind TEXT NOT NULL CHECK (content_kind IN ('lesson', 'question', 'story', 'chapter')),
    content_slug TEXT NOT NULL,
    message TEXT NOT NULL CHECK (char_length(message) BETWEEN 10 AND 1000),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE memory_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_feedback ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS player_sessions_game_sessions ON game_sessions;
DROP POLICY IF EXISTS player_sessions_quiz_attempts ON quiz_attempts;
DROP POLICY IF EXISTS player_sessions_memory_results ON memory_results;
DROP POLICY IF EXISTS player_sessions_story_progress ON story_progress;
DROP POLICY IF EXISTS player_sessions_player_stats ON player_stats;
DROP POLICY IF EXISTS player_sessions_player_achievements ON player_achievements;
DROP POLICY IF EXISTS player_sessions_content_feedback ON content_feedback;

-- Create RLS Policies using current_setting('app.player_session_id', true)
CREATE POLICY player_sessions_game_sessions ON game_sessions
    FOR ALL USING (player_session_id = NULLIF(current_setting('app.player_session_id', true), '')::uuid);

CREATE POLICY player_sessions_quiz_attempts ON quiz_attempts
    FOR ALL USING (player_session_id = NULLIF(current_setting('app.player_session_id', true), '')::uuid);

CREATE POLICY player_sessions_memory_results ON memory_results
    FOR ALL USING (player_session_id = NULLIF(current_setting('app.player_session_id', true), '')::uuid);

CREATE POLICY player_sessions_story_progress ON story_progress
    FOR ALL USING (player_session_id = NULLIF(current_setting('app.player_session_id', true), '')::uuid);

CREATE POLICY player_sessions_player_stats ON player_stats
    FOR ALL USING (player_session_id = NULLIF(current_setting('app.player_session_id', true), '')::uuid);

CREATE POLICY player_sessions_player_achievements ON player_achievements
    FOR ALL USING (player_session_id = NULLIF(current_setting('app.player_session_id', true), '')::uuid);

CREATE POLICY player_sessions_content_feedback ON content_feedback
    FOR ALL USING (player_session_id = NULLIF(current_setting('app.player_session_id', true), '')::uuid);
