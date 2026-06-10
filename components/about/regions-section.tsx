import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Waves, Mountain, TreePine } from 'lucide-react';

const regions = [
  {
    icon: Mountain,
    name: 'Manipur',
    description: 'The ancestral homeland in the Imphal Valley and surrounding foothills, where the language first took root and where it continues to be spoken in villages, temples, and family gatherings.',
  },
  {
    icon: Waves,
    name: 'Assam',
    description: 'The Barak Valley and Cachar district, where communities settled after crossing the river. The Assam dialect is one of the major variants, with its own vocabulary and pronunciation.',
  },
  {
    icon: TreePine,
    name: 'Tripura',
    description: 'The hill-state communities that maintain traditional weaving songs, agricultural practices, and folk tales in Bishnupriya Manipuri. The Tripura variant carries distinct tonal patterns.',
  },
  {
    icon: MapPin,
    name: 'Bangladesh',
    description: 'The Sylhet region, where the language has been spoken for generations. Bangladeshi Bishnupriya communities maintain rich traditions of folk singing and storytelling.',
  },
];

export function RegionsSection() {
  return (
    <section className="py-16 sm:py-24 bg-[hsl(var(--secondary))]/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-3 inline-flex items-center gap-2">
            <div className="h-px w-6 bg-primary/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Regions</span>
            <div className="h-px w-6 bg-primary/40" />
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight">Where the Language Lives</h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Bishnupriya Manipuri is spoken across valleys, hills, and plains — each region adding its own voice to the language
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {regions.map((region) => (
            <Card key={region.name} className="h-full border-border/50 transition-all hover:border-primary/20">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <region.icon className="h-5 w-5" />
                </div>
                <h3 className="text-center font-display text-lg font-semibold mb-2">{region.name}</h3>
                <p className="text-center text-sm text-muted-foreground leading-relaxed">{region.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
