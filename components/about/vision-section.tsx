import { Card, CardContent } from '@/components/ui/card';
import { Eye, BookOpenText, TreePine, Radio } from 'lucide-react';

const pillars = [
  {
    icon: Eye,
    title: 'Vision',
    description: 'A living archive where Bishnupriya Manipuri thrives across generations — spoken in homes, sung in festivals, written in manuscripts, and taught in classrooms. A future where the language remains a bridge between past and present.',
  },
  {
    icon: BookOpenText,
    title: 'Documentation',
    description: 'Systematically record vocabulary, grammar, folk tales, oral histories, and traditional songs. Create a searchable, accessible digital repository that serves scholars, learners, and community members alike.',
  },
  {
    icon: TreePine,
    title: 'Transmission',
    description: 'Develop teaching materials, interactive vocabulary tools, and audio recordings that help parents pass the language to children and help learners of all ages build fluency from any starting point.',
  },
  {
    icon: Radio,
    title: 'Community',
    description: 'Connect speakers across Assam, Tripura, Manipur, Bangladesh, and the diaspora. Create a space where stories are shared, research is collaborative, and the community drives its own cultural preservation.',
  },
];

export function VisionSection() {
  return (
    <section className="py-16 sm:py-24 bg-[hsl(var(--background))]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-3 inline-flex items-center gap-2">
            <div className="h-px w-6 bg-primary/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Vision</span>
            <div className="h-px w-6 bg-primary/40" />
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight">Our Purpose</h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Guiding our work to preserve and celebrate Bishnupriya Manipuri heritage
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <Card key={pillar.title} className="h-full text-center border-border/50">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <pillar.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
