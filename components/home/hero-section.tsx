'use client';

import { ManuscriptBorder } from '@/components/shared/manuscript-border';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpenText } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const backgroundImages = [
  { id: 1, url: '/images/hero/bm_dakula.png', label: 'Dhakula' },
  { id: 2, url: '/images/hero/bishnupriya_manipuri_women.webp', label: 'Traditional villages' },
  { id: 3, url: '/images/hero/Bishu-festival.avif', label: 'Books and archives' },
  { id: 4, url: '/images/hero/Raas-leela.png', label: 'Community events' },
  { id: 5, url: '/images/hero/shaheed-sudheshna.jpg', label: 'Language learning scenes' },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 6000); 

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#2F5D50]">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        .animate-ken-burns {
          animation: kenburns 20s ease-out forwards;
        }
      `}} />

      {/* Slideshow Background */}
      <div className="absolute inset-0 z-0 bg-[#2F5D50]">
        {backgroundImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${
                index === currentSlide ? 'animate-ken-burns' : ''
              }`}
              style={{ backgroundImage: `url('${image.url}')` }}
              aria-label={image.label}
            />
          </div>
        ))}
        
        {/* FIX: Changed from mix-blend-multiply to a standard dark slate overlay */}
        <div className="absolute inset-0 bg-slate-900/60 z-20" />
      </div>

      {/* Original Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('/images/patterns/lahing-stripes.png')] bg-repeat z-20" 
        aria-hidden="true" 
      />

      {/* Content */}
      <div className="relative z-30 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
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

          <p className="mt-6 text-lg leading-relaxed text-[#F5F1E8]/90 sm:text-xl">
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
                className="gap-2 rounded-md border-[#C9A66B]/30 text-[#F5F1E8] hover:bg-[#C9A66B]/10 hover:text-[#C9A66B] bg-transparent backdrop-blur-sm"
              >
                Begin Learning
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <ManuscriptBorder variant="bottom" className="absolute bottom-0 w-full text-[#C9A66B]/20 z-30" />
    </section>
  );
}