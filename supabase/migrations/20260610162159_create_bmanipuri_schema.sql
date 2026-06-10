/*
# Bishnupriya Manipuri Language Preservation Website Schema

1. Purpose
Create the complete database schema for a public website promoting and preserving
the Bishnupriya Manipuri language. No authentication required — all content is public.

2. New Tables

### categories
- `id` (uuid, primary key) — unique identifier
- `name` (text, not null) — display name, e.g. "History", "Grammar"
- `slug` (text, not null, unique) — URL-safe identifier
- `description` (text) — short description of the category
- `created_at` (timestamptz) — auto-set

### articles
- `id` (uuid, primary key) — unique identifier
- `title` (text, not null) — article title
- `slug` (text, not null, unique) — URL-safe unique identifier
- `excerpt` (text) — short preview text for listings
- `content` (text) — full article content (HTML/Markdown)
- `category_id` (uuid, foreign key → categories.id) — article category
- `cover_image` (text) — optional image URL
- `is_featured` (boolean, default false) — shown on homepage
- `published_at` (timestamptz) — publication date, null = draft
- `meta_description` (text) — SEO meta description
- `created_at` (timestamptz) — auto-set
- `updated_at` (timestamptz) — auto-set

### resources
- `id` (uuid, primary key)
- `title` (text, not null) — resource title
- `description` (text) — resource description
- `type` (text, not null) — "pdf", "video", "link", "audio"
- `url` (text) — external URL if applicable
- `file_path` (text) — Supabase storage path if file stored
- `category` (text) — resource category, e.g. "vocabulary", "grammar", "learning"
- `created_at` (timestamptz) — auto-set

### contact_messages
- `id` (uuid, primary key)
- `name` (text, not null) — sender name
- `email` (text, not null) — sender email
- `subject` (text) — message subject
- `message` (text, not null) — message body
- `created_at` (timestamptz) — auto-set

3. Security
- Enable RLS on all tables.
- Public read access for articles, categories, resources (TO anon, authenticated).
- Public insert for contact_messages (allow anyone to submit contact forms).
- No write access to articles/categories/resources for anonymous users (data managed via Supabase Dashboard or admin tools).
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  cover_image text,
  is_featured boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  meta_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  type text NOT NULL DEFAULT 'pdf',
  url text,
  file_path text,
  category text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Categories: public read
DROP POLICY IF EXISTS "categories_public_select" ON categories;
CREATE POLICY "categories_public_select" ON categories
  FOR SELECT TO anon, authenticated USING (true);

-- Articles: public read only published
DROP POLICY IF EXISTS "articles_public_select" ON articles;
CREATE POLICY "articles_public_select" ON articles
  FOR SELECT TO anon, authenticated USING (published_at IS NOT NULL);

-- Resources: public read
DROP POLICY IF EXISTS "resources_public_select" ON resources;
CREATE POLICY "resources_public_select" ON resources
  FOR SELECT TO anon, authenticated USING (true);

-- Contact messages: public insert (allow anyone to submit)
DROP POLICY IF EXISTS "contact_public_insert" ON contact_messages;
CREATE POLICY "contact_public_insert" ON contact_messages
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(is_featured);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published_at);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category);
CREATE INDEX IF NOT EXISTS idx_resources_type ON resources(type);
