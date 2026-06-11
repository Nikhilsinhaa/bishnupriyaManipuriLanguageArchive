import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

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
    <section className="py-16 sm:py-24 bg-[#F5F1E8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2">
            <div className="h-px w-6 bg-[#C96A4A]/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C96A4A]">
              Daily Vocabulary
            </span>
            <div className="h-px w-6 bg-[#C96A4A]/40" />
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900">Word of the Day</h2>
        </div>

        <Card className="mx-auto max-w-2xl border-[#C9A66B]/30 bg-white shadow-sm relative overflow-hidden">
          {/* Subtle top border accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-[#C96A4A]"></div>
          
          <CardContent className="p-8 sm:p-10">
            <div className="text-center">
              <div className="mb-4 flex items-center justify-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#2F5D50]">
                  {word.part_of_speech || 'Word'}
                </span>
              </div>

              <h3 className="font-display text-4xl font-bold text-gray-900 sm:text-5xl">
                {word.word}
              </h3>

              {word.transliteration && (
                <p className="mt-2 text-lg font-medium text-gray-500">
                  /{word.transliteration}/
                </p>
              )}

              {word.pronunciation_guide && (
                <p className="mt-1 text-sm text-gray-400">
                  Pronounced: {word.pronunciation_guide}
                </p>
              )}

              <div className="mx-auto my-6 h-px w-16 bg-[#C9A66B]/30" />

              <p className="text-xl font-medium text-gray-800">{word.meaning}</p>

              {word.example_sentence && (
                <div className="mt-6 flex items-start gap-3 rounded-lg bg-[#F5F1E8]/50 p-4 text-left border border-[#C9A66B]/10">
                  <Quote className="mt-0.5 h-4 w-4 shrink-0 text-[#C96A4A]" />
                  <div>
                    <p className="text-sm italic text-gray-700">{word.example_sentence}</p>
                    <p className="mt-1 text-xs text-gray-500">Example usage</p>
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
