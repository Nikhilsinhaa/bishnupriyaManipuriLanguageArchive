import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ArticlesList } from '@/components/articles/articles-list';
import { ArticlesFilters } from '@/components/articles/articles-filters';
import { ArticlesSkeleton } from '@/components/articles/articles-skeleton';
import { supabase } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Explore articles about Bishnupriya Manipuri history, grammar, vocabulary, literature, culture, folklore, and learning resources.',
};

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: { search?: string; category?: string; page?: string };
}) {
  const { data: categories } = await supabase.from('categories').select('*').order('name');

  return (
    <div>
      <div className="border-b border-border/50 bg-[hsl(var(--secondary))]/50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-3 inline-flex items-center gap-2">
            <div className="h-px w-6 bg-primary/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Research</span>
            <div className="h-px w-6 bg-primary/40" />
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Articles</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Scholarship, grammar, folklore, and cultural writing about the Bishnupriya Manipuri language.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ArticlesFilters categories={categories || []} />
        <Suspense fallback={<ArticlesSkeleton />}>
          <ArticlesList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
