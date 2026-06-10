import { Suspense } from 'react';
import { HeroSection } from '@/components/home/hero-section';
import { WordOfDay } from '@/components/home/word-of-day';
import { LanguageStatsSection } from '@/components/home/language-stats-section';
import { FolkStoriesSection } from '@/components/home/folk-stories-section';
import { FeaturedArticles } from '@/components/home/featured-articles';
import { CommunityCTA } from '@/components/home/community-cta';
import { HomeSkeleton } from '@/components/home/home-skeleton';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Suspense fallback={<HomeSkeleton />}>
        <WordOfDay />
      </Suspense>
      <Suspense fallback={<HomeSkeleton />}>
        <LanguageStatsSection />
      </Suspense>
      <Suspense fallback={<HomeSkeleton />}>
        <FolkStoriesSection />
      </Suspense>
      <Suspense fallback={<HomeSkeleton />}>
        <FeaturedArticles />
      </Suspense>
      <CommunityCTA />
    </div>
  );
}
