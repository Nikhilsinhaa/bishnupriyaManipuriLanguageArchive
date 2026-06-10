import { Card, CardContent } from '@/components/ui/card';
import { BookOpenText, Heart, TreePine, ShieldAlert } from 'lucide-react';

const reasons = [
  {
    icon: BookOpenText,
    title: 'Living Literary Heritage',
    description: 'Bishnupriya Manipuri carries a centuries-old literary tradition — folk songs, poetry, and oral narratives that document the community worldview, agricultural cycles, and spiritual practices. Preserving the language means preserving these texts in their original form.',
  },
  {
    icon: Heart,
    title: 'Identity Across Borders',
    description: 'For communities spread across Assam, Tripura, Manipur, and Bangladesh, the language is the thread that connects diaspora to homeland. It is the language of family kitchens, village festivals, and ancestral prayers.',
  },
  {
    icon: TreePine,
    title: 'Intergenerational Roots',
    description: 'When a language is not passed down to children, the chain of transmission breaks. Active preservation through education, storytelling, and family practice ensures that grandparents can teach grandchildren in their mother tongue.',
  },
  {
    icon: ShieldAlert,
    title: 'Vulnerable Status',
    description: 'The Bishnupriya Manipuri language is classified as vulnerable by UNESCO. Without documentation and teaching, it risks gradual decline, taking with it centuries of oral traditions, weaving songs, and agricultural knowledge.',
  },
];

export function ImportanceSection() {
  return (
    <section className="py-16 sm:py-24 bg-[hsl(var(--secondary))]/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-3 inline-flex items-center gap-2">
            <div className="h-px w-6 bg-primary/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Significance</span>
            <div className="h-px w-6 bg-primary/40" />
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight">Why Preservation Matters</h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            The language carries our history, our stories, and our connection to home
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {reasons.map((reason) => (
            <Card key={reason.title} className="h-full border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <reason.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-2">{reason.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
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
