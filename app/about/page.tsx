import type { Metadata } from 'next';
import { HistorySection } from '@/components/about/history-section';
import { ImportanceSection } from '@/components/about/importance-section';
import { VisionSection } from '@/components/about/vision-section';
import { RegionsSection } from '@/components/about/regions-section';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about the history, heritage, and mission of the Bishnupriya Manipuri Language Archive — a digital preservation project spanning Assam, Tripura, Manipur, and Bangladesh.',
};

export default function AboutPage() {
  return (
    <div>
      <div className="border-b border-border/50 bg-[hsl(var(--secondary))]/50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-3 inline-flex items-center gap-2">
            <div className="h-px w-6 bg-primary/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">About the Archive</span>
            <div className="h-px w-6 bg-primary/40" />
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Preserving a Language Across Borders
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The Bishnupriya Manipuri language has traveled across rivers, valleys, and borders.
            This archive is dedicated to preserving that journey for future generations.
          </p>
        </div>
      </div>
      <HistorySection />
      <RegionsSection />
      <ImportanceSection />
      <VisionSection />
    </div>
  );
}
