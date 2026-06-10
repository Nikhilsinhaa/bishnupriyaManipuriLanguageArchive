import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/contact-form';
import { ContactInfo } from '@/components/contact/contact-info';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Bishnupriya Manipuri Language Archive. Share stories, contribute research, or ask questions about the language.',
};

export default function ContactPage() {
  return (
    <div>
      <div className="border-b border-border/50 bg-[hsl(var(--secondary))]/50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-3 inline-flex items-center gap-2">
            <div className="h-px w-6 bg-primary/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Community</span>
            <div className="h-px w-6 bg-primary/40" />
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Contact</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have stories to share, research to contribute, or questions to ask? We would love to hear from you.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}
