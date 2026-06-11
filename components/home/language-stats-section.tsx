import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Globe, Map, BookOpen, ShieldAlert, ScrollText } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  users: <Users className="h-5 w-5" />,
  globe: <Globe className="h-5 w-5" />,
  map: <Map className="h-5 w-5" />,
  'book-open': <BookOpen className="h-5 w-5" />,
  'shield-alert': <ShieldAlert className="h-5 w-5" />,
  'scroll-text': <ScrollText className="h-5 w-5" />,
};

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
    <section className="py-16 sm:py-24 bg-[#F5F1E8] relative overflow-hidden">
      {/* Subtle background border for academic feel */}
      <div className="absolute top-0 left-0 w-full h-px bg-[#C9A66B]/30"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-[#C9A66B]/30"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2">
            <div className="h-px w-6 bg-[#C96A4A]/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C96A4A]">
              By the Numbers
            </span>
            <div className="h-px w-6 bg-[#C96A4A]/40" />
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-[#2F5D50]">Language at a Glance</h2>
          <p className="mt-2 text-gray-600">
            Key figures about the Bishnupriya Manipuri language today
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <Card
              key={stat.id}
              className="border-[#C9A66B]/20 bg-white transition-all hover:border-[#C96A4A]/40 hover:shadow-sm rounded-sm"
            >
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F5F1E8] border border-[#C9A66B]/30 text-[#C96A4A]">
                  {iconMap[stat.icon || ''] || <Globe className="h-5 w-5" />}
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-[#2F5D50]">{stat.value}</p>
                  <p className="text-sm font-medium text-gray-700">{stat.label}</p>
                  {stat.description && (
                    <p className="mt-0.5 text-xs text-gray-500 leading-relaxed">
                      {stat.description}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
