import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ScrollText, Users, Mail } from 'lucide-react';

export function CommunityCTA() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-sm border border-[#C9A66B]/30 bg-[#2F5D50] px-6 py-16 sm:px-12 sm:py-20 shadow-md">
          {/* Background Texture Overlay */}
          <div 
            className="absolute inset-0 opacity-5 mix-blend-overlay bg-[url('/images/patterns/manuscript-texture.jpg')] bg-cover" 
            aria-hidden="true" 
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <div className="mb-3 inline-flex items-center gap-2">
              <div className="h-px w-8 bg-[#C9A66B]/60" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A66B]">
                Community
              </span>
              <div className="h-px w-8 bg-[#C9A66B]/60" />
            </div>
            <h2 className="font-display text-3xl font-bold text-[#F5F1E8] sm:text-4xl">
              Preserve Our Heritage Together
            </h2>
            <p className="mt-4 text-lg text-[#F5F1E8]/80 leading-relaxed">
              Whether you are a native speaker, a researcher, a student, or a descendant of the diaspora,
              your knowledge and stories matter. Help us build the most comprehensive archive of Bishnupriya Manipuri culture.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="flex flex-col items-center gap-3 rounded-sm border border-[#C9A66B]/20 bg-[#F5F1E8]/5 p-5 backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A66B]/20 text-[#C9A66B]">
                  <ScrollText className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-sm text-[#F5F1E8]">Share Stories</h3>
                <p className="text-xs text-[#F5F1E8]/60">Contribute folk tales, oral histories, and family narratives</p>
              </div>
              <div className="flex flex-col items-center gap-3 rounded-sm border border-[#C9A66B]/20 bg-[#F5F1E8]/5 p-5 backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A66B]/20 text-[#C9A66B]">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-sm text-[#F5F1E8]">Teach the Language</h3>
                <p className="text-xs text-[#F5F1E8]/60">Help create vocabulary guides, grammar lessons, and recordings</p>
              </div>
              <div className="flex flex-col items-center gap-3 rounded-sm border border-[#C9A66B]/20 bg-[#F5F1E8]/5 p-5 backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A66B]/20 text-[#C9A66B]">
                  <Mail className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-sm text-[#F5F1E8]">Get in Touch</h3>
                <p className="text-xs text-[#F5F1E8]/60">Share ideas, corrections, or research contributions</p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="gap-2 rounded-sm bg-[#C9A66B] text-[#2F5D50] hover:bg-[#C9A66B]/90 font-semibold border-none">
                  <Mail className="h-4 w-4" />
                  Contribute
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
