import { CommunityCTA } from '@/components/home/community-cta';
import { FeaturedArticles } from '@/components/home/featured-articles';
import { FolkStoriesSection } from '@/components/home/folk-stories-section';
import { HeroSection } from '@/components/home/hero-section';
import { HomeSkeleton } from '@/components/home/home-skeleton';
import { LanguageStatsSection } from '@/components/home/language-stats-section';
import { WordOfDay } from '@/components/home/word-of-day';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div>
      <HeroSection />

      {/* 1. Language at a Glance */}
      <Suspense fallback={<HomeSkeleton />}>
        <LanguageStatsSection />
      </Suspense>

      {/* 2. Featured Articles */}
      <Suspense fallback={<HomeSkeleton />}>
        <FeaturedArticles />
      </Suspense>

      {/* 3. Folk Stories & Oral History */}
      <Suspense fallback={<HomeSkeleton />}>
        <FolkStoriesSection />
      </Suspense>

      {/* 4. Word of the Day */}
      <Suspense fallback={<HomeSkeleton />}>
        <WordOfDay />
      </Suspense>

      <CommunityCTA />
    </div>
  );
}