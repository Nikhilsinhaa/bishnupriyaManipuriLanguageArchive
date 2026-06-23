'use client';

import { ArrowRight, Calendar, ChevronLeft, ChevronRight, MapPin, Scroll } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';

interface CarouselItem {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  cover_image?: string | null;
  // Folk Story props
  region?: string | null;
  storyteller?: string | null;
  oral_history?: boolean;
  // Article props
  categories?: { name: string; slug: string } | null;
  published_at?: string | null;
}

const fallbackImages = [
  '/images/hero/bm_dakula.png',
  '/images/hero/Raas-leela.png',
  '/images/hero/shaheed-sudheshna.jpg',
  '/images/hero/Bishu-festival.avif',
  '/images/hero/bishnupriya_manipuri_women.webp',
];

export function FolkStoriesCarousel({ stories }: { stories: CarouselItem[] }) {
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
        {stories.map((item, i) => {
          const isArticle = !!item.categories || !!item.published_at;
          const badgeText = item.categories?.name || (item.oral_history ? 'Oral History' : 'Folk Story');
          const imageSrc = item.cover_image || fallbackImages[i % fallbackImages.length];

          return (
            <Link
              key={item.id}
              href={`/article/${item.slug}`}
              data-story-card
              className="group snap-start shrink-0 w-[300px] sm:w-[340px]"
            >
              <div className="archive-card h-full overflow-hidden flex flex-col">
                <div className="relative h-48 overflow-hidden shrink-0">
                  <img
                    src={imageSrc}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-xs text-primary font-medium">
                      {isArticle ? <Calendar className="h-3.5 w-3.5" /> : <Scroll className="h-3.5 w-3.5" />}
                      <span>{badgeText}</span>
                      {item.region && (
                        <>
                          <span className="text-muted-foreground/60">&middot;</span>
                          <MapPin className="h-3 w-3" />
                          <span>{item.region}</span>
                        </>
                      )}
                    </div>
                  </div>
                  {item.oral_history && !isArticle && (
                    <div className="absolute top-4 right-4 rounded-full bg-primary/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                      Oral History
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-lg font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    {item.storyteller && (
                      <p className="mt-1.5 text-xs text-muted-foreground">
                        As told by {item.storyteller}
                      </p>
                    )}

                    {item.published_at && (
                      <p className="mt-1.5 text-xs text-muted-foreground">
                        {new Date(item.published_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    )}

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {item.excerpt || 'Click to read more...'}
                    </p>
                  </div>

                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-all duration-200 group-hover:gap-2.5">
                    {isArticle ? 'Read article' : 'Read the story'}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
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