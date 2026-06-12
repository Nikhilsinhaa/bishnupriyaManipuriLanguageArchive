import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScrollText, Users, Mail, BookOpen, ArrowRight, PenLine, Library, Globe } from 'lucide-react';

const actions = [
  {
    icon: ScrollText,
    title: 'Submit a Story',
    description: 'Share folk tales, oral histories, and family narratives passed down through generations.',
    href: '/contact',
    cta: 'Share Your Story',
    accent: 'text-terracotta bg-terracotta/8 border-terracotta/15',
  },
  {
    icon: PenLine,
    title: 'Contribute Vocabulary',
    description: 'Help build our dictionary with words, pronunciations, and usage examples.',
    href: '/contact',
    cta: 'Add Words',
    accent: 'text-forest bg-forest/8 border-forest/15',
  },
  {
    icon: Library,
    title: 'Share Cultural Resources',
    description: 'Upload recordings, manuscripts, photographs, and research materials to the archive.',
    href: '/resources',
    cta: 'Upload Resources',
    accent: 'text-river bg-river/8 border-river/15',
  },
  {
    icon: Globe,
    title: 'Join the Community',
    description: 'Connect with speakers, learners, and researchers preserving Bishnupriya Manipuri heritage.',
    href: '/contact',
    cta: 'Get Involved',
    accent: 'text-gold bg-gold/8 border-gold/15',
  },
];

export function CommunityCTA() {
  return (
    <section className="py-20 sm:py-28 parchment-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--cream))] via-transparent to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <div className="mb-3 inline-flex items-center gap-2">
            <div className="h-px w-8 bg-primary/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Community
            </span>
            <div className="h-px w-8 bg-primary/40" />
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Preserve Our Heritage Together
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Whether you are a native speaker, a researcher, a student, or a descendant of the diaspora,
            your knowledge and stories matter. Help us build the most comprehensive archive of Bishnupriya Manipuri culture.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action) => (
            <Link key={action.title} href={action.href} className="group">
              <div className={`archive-card h-full p-6 sm:p-7 ${action.accent.split(' ').slice(1).join(' ')}`}>
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${action.accent.split(' ')[0]} ${action.accent.split(' ')[1]} transition-transform duration-300 group-hover:scale-110`}>
                  <action.icon className={`h-6 w-6 ${action.accent.split(' ')[0]}`} />
                </div>

                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {action.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {action.description}
                </p>

                <div className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-all duration-200 group-hover:gap-2.5">
                  {action.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="gap-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-200">
                <Mail className="h-4 w-4" />
                Contact Us
              </Button>
            </Link>
            <Link href="/resources">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 rounded-lg border-primary/20 text-foreground hover:bg-primary/5"
              >
                <BookOpen className="h-4 w-4" />
                Explore Resources
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
