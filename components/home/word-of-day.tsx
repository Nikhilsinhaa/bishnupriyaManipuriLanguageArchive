import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Volume2, Quote } from 'lucide-react';

export async function WordOfDay() {
  const { data: word } = await supabase
    .from('word_of_day')
    .select('*')
    .order('date', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!word) return null;

  return (
    <section className="py-16 sm:py-24 bg-[hsl(var(--cream))]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2">
            <div className="h-px w-6 bg-primary/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Daily Vocabulary
            </span>
            <div className="h-px w-6 bg-primary/40" />
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight">Word of the Day</h2>
          <p className="mt-2 text-muted-foreground">Building vocabulary one word at a time</p>
        </div>

        <Card className="mx-auto max-w-2xl border-primary/10 bg-[hsl(var(--card))]">
          <CardContent className="p-8 sm:p-10">
            <div className="text-center">
              <div className="mb-4 flex items-center justify-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {word.part_of_speech || 'Word'}
                </span>
              </div>

              <h3 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
                {word.word}
              </h3>

              {word.transliteration && (
                <p className="mt-2 text-lg font-medium text-muted-foreground">
                  /{word.transliteration}/
                </p>
              )}

              {word.pronunciation_guide && (
                <p className="mt-1 text-sm text-muted-foreground">
                  Pronounced: {word.pronunciation_guide}
                </p>
              )}

              <div className="mx-auto my-6 h-px w-16 bg-border" />

              <p className="text-xl font-medium text-foreground">{word.meaning}</p>

              {word.example_sentence && (
                <div className="mt-6 flex items-start gap-3 rounded-lg bg-[hsl(var(--muted))]/50 p-4 text-left">
                  <Quote className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm italic text-foreground">{word.example_sentence}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Example usage</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
