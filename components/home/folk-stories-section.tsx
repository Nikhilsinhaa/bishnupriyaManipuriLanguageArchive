import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, Scroll } from 'lucide-react';

export async function FolkStoriesSection() {
  let stories;
  try {
    const result = await supabase
      .from('folk_stories')
      .select('*')
      .eq('is_featured', true)
      .not('published_at', 'is', null)
      .order('published_at', { ascending: false })
      .limit(3);
    stories = result.data;
  } catch {
    return null;
  }

  if (!stories || stories.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 bg-[hsl(var(--background))]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="h-px w-6 bg-primary/40" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Oral Traditions
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight">Folk Stories & Oral History</h2>
            <p className="mt-2 text-muted-foreground max-w-xl">
              Stories passed down through generations, preserving the voices of our ancestors across regions
            </p>
          </div>
          <Link href="/articles?category=folk-stories" className="hidden sm:block">
            <Button variant="ghost" className="gap-2 text-primary hover:text-primary hover:bg-primary/5">
              View all stories
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <Card
              key={story.id}
              className="group h-full border-border/50 transition-all hover:border-primary/20 hover:shadow-md"
            >
              <CardContent className="flex h-full flex-col p-6">
                <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Scroll className="h-3.5 w-3.5 text-primary/70" />
                  <span>Folk Story</span>
                  {story.region && (
                    <>
                      <span className="mx-1">&middot;</span>
                      <MapPin className="h-3 w-3" />
                      <span>{story.region}</span>
                    </>
                  )}
                </div>

                <h3 className="font-display text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
                  {story.title}
                </h3>

                {story.storyteller && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    As told by {story.storyteller}
                  </p>
                )}

                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {story.excerpt || 'Read this story from our oral tradition...'}
                </p>

                <Link
                  href={`/article/${story.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:underline"
                >
                  Read the story
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

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
