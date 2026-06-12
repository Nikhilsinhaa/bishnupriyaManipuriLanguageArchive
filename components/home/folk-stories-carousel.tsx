'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Scroll, ChevronLeft, ChevronRight } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  region: string | null;
  storyteller: string | null;
  oral_history: boolean;
}

const storyImages = [
  '/images/hero/bm_dakula.png',
  '/images/hero/Raas-leela.png',
  '/images/hero/shaheed-sudheshna.jpg',
  '/images/hero/Bishu-festival.avif',
  '/images/hero/bishnupriya_manipuri_women.webp',
];

export function FolkStoriesCarousel({ stories }: { stories: Story[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('[data-story-card]')?.clientWidth || 340;
    el.scrollBy({ left: direction === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' });
    setTimeout(checkScroll, 400);
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {stories.map((story, i) => (
          <Link
            key={story.id}
            href={`/article/${story.slug}`}
            data-story-card
            className="group snap-start shrink-0 w-[300px] sm:w-[340px]"
          >
            <div className="archive-card h-full overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={storyImages[i % storyImages.length]}
                  alt={story.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-xs text-primary">
                    <Scroll className="h-3.5 w-3.5" />
                    <span className="font-medium">Folk Story</span>
                    {story.region && (
                      <>
                        <span className="text-muted-foreground/60">&middot;</span>
                        <MapPin className="h-3 w-3" />
                        <span>{story.region}</span>
                      </>
                    )}
                  </div>
                </div>
                {story.oral_history && (
                  <div className="absolute top-4 right-4 rounded-full bg-primary/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                    Oral History
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="font-display text-lg font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {story.title}
                </h3>

                {story.storyteller && (
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    As told by {story.storyteller}
                  </p>
                )}

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {story.excerpt || 'Read this story from our oral tradition...'}
                </p>

                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-all duration-200 group-hover:gap-2.5">
                  Read the story
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 border border-border/50 shadow-lg backdrop-blur-sm transition-all hover:bg-background hover:shadow-xl z-10"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 border border-border/50 shadow-lg backdrop-blur-sm transition-all hover:bg-background hover:shadow-xl z-10"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

export function FolkStoriesSectionSkeleton() {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
      {[1, 2, 3].map((n) => (
        <div key={n} className="shrink-0 w-[300px] sm:w-[340px]">
          <div className="archive-card overflow-hidden animate-pulse">
            <div className="h-48 bg-muted/50" />
            <div className="p-5 space-y-3">
              <div className="h-5 bg-muted/50 rounded w-3/4" />
              <div className="h-3 bg-muted/50 rounded w-1/2" />
              <div className="h-3 bg-muted/50 rounded w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
