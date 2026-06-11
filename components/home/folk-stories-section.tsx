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
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="h-px w-6 bg-[#C96A4A]/40" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C96A4A]">
                Oral Traditions
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#2F5D50]">Folk Stories & Oral History</h2>
            <p className="mt-2 text-gray-600 max-w-xl">
              Stories passed down through generations, preserving the voices of our ancestors across regions
            </p>
          </div>
          <Link href="/articles?category=folk-stories" className="hidden sm:block">
            <Button variant="ghost" className="gap-2 text-[#C96A4A] hover:text-[#C96A4A] hover:bg-[#C96A4A]/5">
              View all stories
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <Card
              key={story.id}
              className="group h-full border-[#C9A66B]/30 bg-[#F5F1E8]/20 transition-all hover:border-[#C96A4A]/50 hover:shadow-md rounded-sm"
            >
              <CardContent className="flex h-full flex-col p-6">
                <div className="mb-4 flex items-center gap-2 text-xs text-[#2F5D50]/70">
                  <Scroll className="h-3.5 w-3.5 text-[#C9A66B]" />
                  <span className="font-semibold uppercase tracking-wider">Folk Story</span>
                  {story.region && (
                    <>
                      <span className="mx-1 text-[#C9A66B]">&middot;</span>
                      <MapPin className="h-3 w-3" />
                      <span>{story.region}</span>
                    </>
                  )}
                </div>

                <h3 className="font-display text-xl font-semibold leading-tight text-gray-900 group-hover:text-[#C96A4A] transition-colors">
                  {story.title}
                </h3>

                {story.storyteller && (
                  <p className="mt-1 text-xs text-gray-500 italic">
                    As told by {story.storyteller}
                  </p>
                )}

                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">
                  {story.excerpt || 'Read this story from our oral tradition...'}
                </p>

                <Link
                  href={`/article/${story.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#C96A4A] transition-colors hover:underline"
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
            <Button variant="ghost" className="gap-2 text-[#C96A4A]">
              View all stories
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
