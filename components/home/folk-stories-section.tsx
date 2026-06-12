import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { FolkStoriesCarousel } from './folk-stories-carousel';

export async function FolkStoriesSection() {
  let stories;
  try {
    const result = await supabase
      .from('folk_stories')
      .select('*')
      .eq('is_featured', true)
      .not('published_at', 'is', null)
      .order('published_at', { ascending: false })
      .limit(5);
    stories = result.data;
  } catch {
    return null;
  }

  if (!stories || stories.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-[hsl(var(--background))]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="h-px w-8 bg-primary/40" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Oral Traditions
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Folk Stories & Oral History</h2>
            <p className="mt-3 text-muted-foreground max-w-xl leading-relaxed">
              Stories passed down through generations, preserving the voices of our ancestors
            </p>
          </div>
          <Link href="/articles?category=folk-stories" className="hidden sm:block">
            <Button variant="ghost" className="gap-2 text-primary hover:text-primary hover:bg-primary/5">
              View all stories
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <FolkStoriesCarousel stories={stories} />

        <div className="mt-6 text-center sm:hidden">
          <Link href="/articles?category=folk-stories">
            <Button variant="ghost" className="gap-2 text-primary">
              View all stories
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
