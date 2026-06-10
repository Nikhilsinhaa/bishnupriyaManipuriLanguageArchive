import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpenText } from 'lucide-react';
import { ManuscriptBorder } from '@/components/shared/manuscript-border';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--parchment))]">
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="manuscript-grid" width="12" height="12" patternUnits="userSpaceOnUse">
              <path d="M 12 0 L 0 0 0 12" fill="none" stroke="currentColor" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#manuscript-grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="max-w-3xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-8 bg-primary/60" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Language Preservation
            </span>
          </div>

          <h1 className="font-display text-4xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            The Living Archive of{' '}
            <span className="text-primary">Bishnupriya Manipuri</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Documenting language, literature, and oral traditions across the rivers of Assam,
            the hills of Tripura, the valleys of Manipur, and the plains of Bangladesh.
            A space for heritage, scholarship, and community.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/articles">
              <Button size="lg" className="gap-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                <BookOpenText className="h-4 w-4" />
                Explore the Archive
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/resources">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 rounded-md border-primary/20 text-foreground hover:bg-primary/5"
              >
                Begin Learning
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <ManuscriptBorder variant="bottom" className="absolute bottom-0 w-full" />
    </section>
  );
}
