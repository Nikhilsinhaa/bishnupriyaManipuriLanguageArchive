import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FolkStoriesCarousel } from './folk-stories-carousel';

export async function FeaturedArticles() {
  let articles;
  try {
    const result = await supabase
      .from('articles')
      .select('*, categories(name, slug)')
      .eq('is_featured', true)
      .not('published_at', 'is', null)
      .order('published_at', { ascending: false })
      .limit(6); 
    articles = result.data;
  } catch {
    return null;
  }

  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-[hsl(var(--secondary))]/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="h-px w-8 bg-primary/40" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Research</span>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Featured Articles</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">Scholarship and writing about our language and culture</p>
          </div>
          <Link href="/articles" className="hidden sm:block">
            <Button variant="ghost" className="gap-2 text-primary hover:text-primary hover:bg-primary/5">
              View all
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Carousel UI populated with Article objects */}
        <FolkStoriesCarousel stories={articles} />

        <div className="mt-6 text-center sm:hidden">
          <Link href="/articles">
            <Button variant="ghost" className="gap-2 text-primary">
              View all articles
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}