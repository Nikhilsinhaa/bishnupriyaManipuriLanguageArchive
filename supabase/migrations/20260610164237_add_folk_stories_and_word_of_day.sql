/*
# Add Folk Stories, Word of Day, and Language Stats tables

1. New Tables

### word_of_day
- `id` (uuid, primary key)
- `word` (text, not null) — the Bishnupriya Manipuri word
- `transliteration` (text) — romanized form
- `meaning` (text, not null) — English definition
- `example_sentence` (text) — example usage
- `part_of_speech` (text) — noun, verb, adjective, etc.
- `pronunciation_guide` (text) — phonetic guide
- `date` (date, not null) — the date this word is featured
- `created_at` (timestamptz)

### folk_stories
- `id` (uuid, primary key)
- `title` (text, not null)
- `slug` (text, not null, unique)
- `excerpt` (text) — short preview
- `content` (text) — full story text
- `region` (text) — origin region (Assam, Tripura, Bangladesh, Manipur)
- `storyteller` (text) — traditional storyteller attribution
- `oral_history` (boolean, default false) — whether it's an oral history recording
- `is_featured` (boolean, default false)
- `published_at` (timestamptz)
- `created_at` (timestamptz)

### language_stats
- `id` (uuid, primary key)
- `label` (text, not null) — e.g. "Active Speakers", "Dialects"
- `value` (text, not null) — e.g. "400,000"
- `description` (text) — context/explanation
- `order` (int, default 0) — display order
- `icon` (text) — lucide icon name
- `created_at` (timestamptz)

### vocabularies
- `id` (uuid, primary key)
- `word` (text, not null) — Bishnupriya Manipuri word
- `transliteration` (text)
- `meaning` (text, not null) — English meaning
- `category` (text) — e.g. "greetings", "family", "nature"
- `example_sentence` (text)
- `created_at` (timestamptz)

2. Security
- All tables: RLS enabled, public read for anonymous users.
- word_of_day, folk_stories, language_stats: public read only.
- vocabularies: public read only.
*/

CREATE TABLE IF NOT EXISTS word_of_day (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  word text NOT NULL,
  transliteration text,
  meaning text NOT NULL,
  example_sentence text,
  part_of_speech text,
  pronunciation_guide text,
  date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS folk_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text,
  region text,
  storyteller text,
  oral_history boolean NOT NULL DEFAULT false,
  is_featured boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS language_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  value text NOT NULL,
  description text,
  "order" int NOT NULL DEFAULT 0,
  icon text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS vocabularies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  word text NOT NULL,
  transliteration text,
  meaning text NOT NULL,
  category text,
  example_sentence text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE word_of_day ENABLE ROW LEVEL SECURITY;
ALTER TABLE folk_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE language_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE vocabularies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "word_of_day_public_select" ON word_of_day;
CREATE POLICY "word_of_day_public_select" ON word_of_day
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "folk_stories_public_select" ON folk_stories;
CREATE POLICY "folk_stories_public_select" ON folk_stories
  FOR SELECT TO anon, authenticated USING (published_at IS NOT NULL);

DROP POLICY IF EXISTS "language_stats_public_select" ON language_stats;
CREATE POLICY "language_stats_public_select" ON language_stats
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "vocabularies_public_select" ON vocabularies;
CREATE POLICY "vocabularies_public_select" ON vocabularies
  FOR SELECT TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_word_of_day_date ON word_of_day(date);
CREATE INDEX IF NOT EXISTS idx_folk_stories_featured ON folk_stories(is_featured);
CREATE INDEX IF NOT EXISTS idx_folk_stories_slug ON folk_stories(slug);
CREATE INDEX IF NOT EXISTS idx_folk_stories_published ON folk_stories(published_at);
CREATE INDEX IF NOT EXISTS idx_vocabularies_category ON vocabularies(category);
