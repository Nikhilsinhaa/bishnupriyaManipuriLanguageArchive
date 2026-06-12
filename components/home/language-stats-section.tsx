import { supabase } from '@/lib/supabase';
import { Users, Globe, Map, BookOpen, ShieldAlert, ScrollText } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  users: <Users className="h-6 w-6" />,
  globe: <Globe className="h-6 w-6" />,
  map: <Map className="h-6 w-6" />,
  'book-open': <BookOpen className="h-6 w-6" />,
  'shield-alert': <ShieldAlert className="h-6 w-6" />,
  'scroll-text': <ScrollText className="h-6 w-6" />,
};

const accentColors = [
  { bg: 'bg-primary/8', border: 'border-primary/15', text: 'text-primary', glow: 'from-primary/5' },
  { bg: 'bg-forest/8', border: 'border-forest/15', text: 'text-forest', glow: 'from-forest/5' },
  { bg: 'bg-river/8', border: 'border-river/15', text: 'text-river', glow: 'from-river/5' },
  { bg: 'bg-gold/8', border: 'border-gold/15', text: 'text-gold', glow: 'from-gold/5' },
  { bg: 'bg-terracotta/8', border: 'border-terracotta/15', text: 'text-terracotta', glow: 'from-terracotta/5' },
  { bg: 'bg-accent/8', border: 'border-accent/15', text: 'text-accent', glow: 'from-accent/5' },
];

export async function LanguageStatsSection() {
  let stats;
  try {
    const result = await supabase
      .from('language_stats')
      .select('*')
      .order('order', { ascending: true });
    stats = result.data;
  } catch {
    return null;
  }

  if (!stats || stats.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-[hsl(var(--secondary))]/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
        <svg className="h-full w-full" viewBox="0 0 200 200" preserveAspectRatio="none">
          <defs>
            <pattern id="stats-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#stats-pattern)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <div className="mb-3 inline-flex items-center gap-2">
            <div className="h-px w-8 bg-primary/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              By the Numbers
            </span>
            <div className="h-px w-8 bg-primary/40" />
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Language at a Glance</h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Key figures about the Bishnupriya Manipuri language today
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stats.map((stat, i) => {
            const accent = accentColors[i % accentColors.length];
            return (
              <div
                key={stat.id}
                className={`archive-card group p-6 sm:p-7 ${accent.border}`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${accent.bg} ${accent.text} transition-transform duration-300 group-hover:scale-110`}>
                    {iconMap[stat.icon || ''] || <Globe className="h-6 w-6" />}
                  </div>
                </div>

                <p className={`font-display text-3xl sm:text-4xl font-bold count-up tracking-tight ${accent.text}`}>
                  {stat.value}
                </p>

                <p className="mt-2 text-base font-semibold text-foreground">
                  {stat.label}
                </p>

                {stat.description && (
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {stat.description}
                  </p>
                )}

                <div className={`mt-5 h-1 w-12 rounded-full bg-gradient-to-r ${accent.glow} to-transparent transition-all duration-300 group-hover:w-20`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
