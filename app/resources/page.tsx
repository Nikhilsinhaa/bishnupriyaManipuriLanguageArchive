import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ResourcesFetcher } from '@/components/resources/resources-fetcher';
import { ResourcesSkeleton } from '@/components/resources/resources-skeleton';

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Learning materials, vocabulary lists, grammar guides, and cultural resources for the Bishnupriya Manipuri language.',
};

export default function ResourcesPage() {
  return (
    <div>
      <div className="border-b border-border/50 bg-[hsl(var(--secondary))]/50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-3 inline-flex items-center gap-2">
            <div className="h-px w-6 bg-primary/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Library</span>
            <div className="h-px w-6 bg-primary/40" />
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Resources</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Learning materials, vocabulary guides, grammar references, and cultural documents for all learners.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Suspense fallback={<ResourcesSkeleton />}>
          <ResourcesFetcher />
        </Suspense>
      </div>
    </div>
  );
}
