# Deployment Guide

## Required Environment Variables

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://your-project.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJhbGci...` |

Copy `.env.example` to `.env` and fill in the values from your Supabase project dashboard (Settings > API).

## Vercel Deployment Steps

1. Push the project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. In the Vercel project settings, add the two environment variables listed above.
4. Deploy. Vercel auto-detects Next.js and runs `next build`.
5. After deployment, set your custom domain in Vercel project settings if desired.

## Supabase Setup Steps

1. Create a Supabase project at [supabase.com](https://supabase.com).
2. Run the migrations in order from `supabase/migrations/`:
   - `20260610162134_create_bmanipuri_schema.sql` (or `20260610162159_...` — they are identical)
   - `20260610164237_add_folk_stories_and_word_of_day.sql`
3. If you need file downloads for resources, create a Supabase Storage bucket named `resources` and set it to public.
4. Add content via the Supabase Dashboard (Table Editor) or the Supabase API. Required tables:
   - `categories` — article categories (name, slug, description)
   - `articles` — articles with HTML content (title, slug, excerpt, content, category_id, is_featured, published_at)
   - `resources` — downloadable/linked resources (title, type, url, file_path, category)
   - `contact_messages` — populated by the contact form
   - `word_of_day` — daily vocabulary entries
   - `folk_stories` — folk stories and oral histories
   - `language_stats` — homepage statistics cards
   - `vocabularies` — vocabulary entries

## Common Troubleshooting

### Build fails with "Supabase URL is required"
Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set in your Vercel environment variables. Redeploy after adding them.

### Pages show no content
Check that the Supabase tables have data and that RLS policies allow `anon` access. The site uses the anonymous key for all reads.

### Contact form does not submit
Verify the `contact_messages` table exists and the `contact_public_insert` RLS policy is active. Check the browser console for errors.

### Sitemap is empty or missing article pages
The sitemap gracefully falls back to static pages only if Supabase is unavailable. If articles exist but don't appear, ensure `published_at` is set (null means draft, excluded from queries).

### Images not loading
The project uses `next.config.js` with `images: { unoptimized: true }` to support external images. If using a custom image CDN, add it to the `images.remotePatterns` config in `next.config.js`.

### 404 on `/article/[slug]` routes
These are dynamic server-rendered routes. Ensure the article has `published_at` set and `slug` matches the URL. If Supabase is unreachable, all article pages return 404.
