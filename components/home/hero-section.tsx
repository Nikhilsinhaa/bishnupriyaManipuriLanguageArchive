import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpenText } from 'lucide-react';
import { ManuscriptBorder } from '@/components/shared/manuscript-border';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#2F5D50]">
      {/* Background Texture Overlay - Add your image to public/images/patterns/ */}
      <div 
        className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('/images/patterns/lahing-stripes.png')] bg-repeat" 
        aria-hidden="true" 
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="max-w-3xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-8 bg-[#C9A66B]/60" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A66B]">
              Language Preservation
            </span>
          </div>

          <h1 className="font-display text-4xl font-bold leading-[1.15] tracking-tight text-[#F5F1E8] sm:text-5xl lg:text-6xl">
            The Living Archive of{' '}
            <span className="text-[#C9A66B]">Bishnupriya Manipuri</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-[#F5F1E8]/80 sm:text-xl">
            Documenting language, literature, and oral traditions across the rivers of Assam,
            the hills of Tripura, the valleys of Manipur, and the plains of Bangladesh.
            A space for heritage, scholarship, and community.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/articles">
              <Button size="lg" className="gap-2 rounded-md bg-[#C96A4A] text-white hover:bg-[#C96A4A]/90 border-none">
                <BookOpenText className="h-4 w-4" />
                Explore the Archive
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/resources">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 rounded-md border-[#C9A66B]/30 text-[#F5F1E8] hover:bg-[#C9A66B]/10 hover:text-[#C9A66B] bg-transparent"
              >
                Begin Learning
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <ManuscriptBorder variant="bottom" className="absolute bottom-0 w-full text-[#C9A66B]/20" />
    </section>
  );
}
