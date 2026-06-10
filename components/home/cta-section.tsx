import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, PenLine } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-16 sm:px-12 sm:py-20">
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="cta-grid" width="8" height="8" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="0.5" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#cta-grid)" />
            </svg>
          </div>
          <div className="relative mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
              <Heart className="h-7 w-7 text-white" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
              Help Preserve Our Heritage
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Whether you are a native speaker, a learner, or simply passionate about language preservation,
              your contribution matters. Share your knowledge, contribute articles, or help spread awareness.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/resources">
                <Button size="lg" variant="secondary" className="gap-2">
                  Start Learning
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="gap-2 border-white/30 text-white hover:bg-white/20 hover:text-white">
                  <PenLine className="h-4 w-4" />
                  Contribute
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
