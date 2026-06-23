import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';

export async function FolkStoriesSection() {
  let stories;
  try {
    const result = await supabase
      .from('folk_stories')
      .select('*')
      .eq('is_featured', true)
      .not('published_at', 'is', null)
      .order('published_at', { ascending: false })
      .limit(4); 
    stories = result.data;
  } catch {
    return null;
  }

  if (!stories || stories.length === 0) return null;

  const [primary, ...secondary] = stories;

  return (
    <section className="py-20 sm:py-28 bg-[hsl(var(--background))]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex items-end justify-between">
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

        {/* Magazine Grid UI */}
        <div className="grid gap-6 lg:grid-cols-2">
          {primary && (
            <Link href={`/article/${primary.slug}`} className="group">
              <div className="archive-card-featured h-full overflow-hidden">
                {primary.cover_image ? (
                  <div className="relative h-64 sm:h-80 overflow-hidden">
                    <img
                      src={primary.cover_image}
                      alt={primary.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <Badge className="mb-3 gap-1 rounded-md bg-primary/90 text-primary-foreground hover:bg-primary/90">
                        Oral History
                      </Badge>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
                        {primary.title}
                      </h3>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 sm:p-10">
                    <Badge variant="secondary" className="mb-4 rounded-md text-xs">
                      Oral History
                    </Badge>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight group-hover:text-primary transition-colors">
                      {primary.title}
                    </h3>
                  </div>
                )}
                <div className="p-6 pt-4">
                  {primary.published_at && (
                    <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(primary.published_at).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  )}
                  <p className="text-muted-foreground leading-relaxed line-clamp-3">
                    {primary.excerpt || 'Read this traditional story...'}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-all duration-200 group-hover:gap-2.5">
                    Read story
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          )}

          <div className="grid gap-6 sm:grid-cols-1">
            {secondary.map((story) => (
              <Link key={story.id} href={`/article/${story.slug}`} className="group">
                <div className="archive-card h-full overflow-hidden">
                  <div className="flex h-full">
                    {story.cover_image && (
                      <div className="hidden sm:block w-40 shrink-0 overflow-hidden">
                        <img
                          src={story.cover_image}
                          alt={story.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    )}
                    <div className="flex-1 p-5 sm:p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="text-xs rounded-md">
                          Folk Tale
                        </Badge>
                        {story.published_at && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {new Date(story.published_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
                        {story.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {story.excerpt || 'Read story...'}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
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