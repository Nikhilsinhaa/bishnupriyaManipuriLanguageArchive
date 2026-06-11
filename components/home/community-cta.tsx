import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ScrollText, Users, Mail } from 'lucide-react';

export function CommunityCTA() {
  return (
    <section className="py-16 sm:py-24 bg-[hsl(var(--secondary))]/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-xl border border-primary/10 bg-[hsl(var(--parchment))] px-6 py-16 sm:px-12 sm:py-20">
          <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="cta-dots" width="8" height="8" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="0.4" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#cta-dots)" />
            </svg>
          </div>

          <div className="relative mx-auto max-w-2xl text-center">
            <div className="mb-3 inline-flex items-center gap-2">
              <div className="h-px w-8 bg-primary/60" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Community
              </span>
              <div className="h-px w-8 bg-primary/60" />
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Preserve Our Heritage Together
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Whether you are a native speaker, a researcher, a student, or a descendant of the diaspora,
              your knowledge and stories matter. Help us build the most comprehensive archive of Bishnupriya Manipuri culture.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="flex flex-col items-center gap-3 rounded-lg border border-border/50 bg-background/50 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ScrollText className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-sm">Share Stories</h3>
                <p className="text-xs text-muted-foreground">Contribute folk tales, oral histories, and family narratives</p>
              </div>
              <div className="flex flex-col items-center gap-3 rounded-lg border border-border/50 bg-background/50 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-sm">Teach the Language</h3>
                <p className="text-xs text-muted-foreground">Help create vocabulary guides, grammar lessons, and recordings</p>
              </div>
              <div className="flex flex-col items-center gap-3 rounded-lg border border-border/50 bg-background/50 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-sm">Get in Touch</h3>
                <p className="text-xs text-muted-foreground">Share ideas, corrections, or research contributions</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="gap-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                  <Mail className="h-4 w-4" />
                  Contribute
                </Button>
              </Link>
              <Link href="/resources">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 rounded-md border-primary/20 text-foreground hover:bg-primary/5"
                >
                  Explore Resources
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
