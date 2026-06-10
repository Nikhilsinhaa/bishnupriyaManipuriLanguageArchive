import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category_id: string | null;
  cover_image: string | null;
  is_featured: boolean;
  published_at: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
  categories?: Category | null;
};

export type Resource = {
  id: string;
  title: string;
  description: string | null;
  type: string;
  url: string | null;
  file_path: string | null;
  category: string | null;
  created_at: string;
};

export type WordOfDay = {
  id: string;
  word: string;
  transliteration: string | null;
  meaning: string;
  example_sentence: string | null;
  part_of_speech: string | null;
  pronunciation_guide: string | null;
  date: string;
  created_at: string;
};

export type FolkStory = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  region: string | null;
  storyteller: string | null;
  oral_history: boolean;
  is_featured: boolean;
  published_at: string | null;
  created_at: string;
};

export type LanguageStat = {
  id: string;
  label: string;
  value: string;
  description: string | null;
  order: number;
  icon: string | null;
  created_at: string;
};

export type Vocabulary = {
  id: string;
  word: string;
  transliteration: string | null;
  meaning: string;
  category: string | null;
  example_sentence: string | null;
  created_at: string;
};
