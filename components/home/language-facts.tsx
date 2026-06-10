import { Card, CardContent } from '@/components/ui/card';
import { Globe, Users, BookOpen, MapPin } from 'lucide-react';

const facts = [
  {
    icon: Globe,
    title: 'Indo-Aryan Language',
    description: 'Bishnupriya Manipuri belongs to the Indo-Aryan branch of the Indo-European language family, with significant Tibeto-Burman influences.',
  },
  {
    icon: Users,
    title: 'Over 400,000 Speakers',
    description: 'Spoken by approximately 400,000 people across Manipur, Assam, Tripura, and Bangladesh, as well as diaspora communities worldwide.',
  },
  {
    icon: BookOpen,
    title: 'Rich Literary Tradition',
    description: 'The language has a centuries-old literary tradition, including classical poetry, folk songs, and modern prose.',
  },
  {
    icon: MapPin,
    title: 'Endangered Status',
    description: 'Classified as vulnerable by UNESCO, with younger generations increasingly shifting to dominant regional languages.',
  },
];

export function LanguageFacts() {
  return (
    <section className="bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold tracking-tight">Language Facts</h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Understanding the heritage and significance of the Bishnupriya Manipuri language
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <Card key={fact.title} className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <fact.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">{fact.title}</h3>
                <p className="text-sm text-muted-foreground">{fact.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
