import { Card, CardContent } from '@/components/ui/card';
import { Scroll, Compass, Languages, Globe } from 'lucide-react';

const timeline = [
  {
    icon: Scroll,
    era: '15th Century',
    title: 'Origins in the Valley',
    description: 'The Bishnupriya people establish themselves in the Manipur valley, bringing a dialect rooted in Old Bengali that begins to evolve into a distinct language. Settlements form along the riverbanks of the Imphal Valley and surrounding foothills.',
  },
  {
    icon: Compass,
    era: '16th–18th Century',
    title: 'Migration Across Borders',
    description: 'Community members migrate across the Barak River into the Cachar plains of Assam, and later into the Tripura hills. The language develops regional variants influenced by Assamese, Sylheti, and local languages.',
  },
  {
    icon: Languages,
    era: '19th–20th Century',
    title: 'Literary Flourishing',
    description: 'A period of literary growth: folk songs, devotional poetry, and prose are recorded in manuscripts. The language develops its modern identity while maintaining distinct Indo-Aryan roots separate from Meitei and Bengali.',
  },
  {
    icon: Globe,
    era: 'Present Day',
    title: 'Digital Preservation',
    description: 'Communities span Manipur, Assam, Tripura, Bangladesh, and diaspora populations across North America, Europe, and Australia. The language is classified as vulnerable — requiring urgent documentation and intergenerational transmission.',
  },
];

export function HistorySection() {
  return (
    <section className="py-16 sm:py-24 bg-[hsl(var(--background))]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-3 inline-flex items-center gap-2">
            <div className="h-px w-6 bg-primary/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">History</span>
            <div className="h-px w-6 bg-primary/40" />
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight">A Journey Through Centuries</h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            From the Manipur valley to diaspora communities worldwide
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {timeline.map((item) => (
            <Card key={item.title} className="border-border/50 transition-all hover:border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary">{item.era}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
