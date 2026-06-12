import { supabase } from '@/lib/supabase';
import { Volume2, Quote, BookOpen } from 'lucide-react';

export async function WordOfDay() {
  let word;
  try {
    const result = await supabase
      .from('word_of_day')
      .select('*')
      .order('date', { ascending: false })
      .limit(1)
      .maybeSingle();
    word = result.data;
  } catch {
    return null;
  }

  if (!word) return null;

  return (
    <section className="py-20 sm:py-28 parchment-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(var(--cream))]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <div className="mb-3 inline-flex items-center gap-2">
            <div className="h-px w-8 bg-primary/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Daily Vocabulary
            </span>
            <div className="h-px w-8 bg-primary/40" />
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Word of the Day</h2>
          <p className="mt-3 text-muted-foreground">Building vocabulary one word at a time</p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="archive-card-featured group">
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 p-8 sm:p-10 lg:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {word.part_of_speech || 'Word'}
                  </span>
                </div>

                <h3 className="font-display text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl tracking-tight">
                  {word.word}
                </h3>

                {word.transliteration && (
                  <p className="mt-3 text-lg font-medium text-muted-foreground font-mono">
                    /{word.transliteration}/
                  </p>
                )}

                {word.pronunciation_guide && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Volume2 className="h-4 w-4 text-primary/60" />
                    <span>{word.pronunciation_guide}</span>
                  </div>
                )}

                <div className="my-8 flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                  <div className="h-2 w-2 rounded-full bg-primary/40" />
                  <div className="h-px flex-1 bg-gradient-to-l from-primary/30 to-transparent" />
                </div>

                <p className="text-2xl font-semibold text-foreground font-display">
                  {word.meaning}
                </p>
              </div>

              {word.example_sentence && (
                <div className="lg:w-[340px] bg-[hsl(var(--secondary))]/50 border-t lg:border-t-0 lg:border-l border-border/40 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-start gap-3">
                    <Quote className="mt-1 h-5 w-5 shrink-0 text-primary/50" />
                    <div>
                      <p className="text-base italic text-foreground leading-relaxed">
                        {word.example_sentence}
                      </p>
                      <p className="mt-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Example usage
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
