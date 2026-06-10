import Link from 'next/link';
import { Feather, Mail } from 'lucide-react';
import { ManuscriptBorder } from './manuscript-border';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ManuscriptBorder variant="bottom">
          <div className="grid gap-10 md:grid-cols-3">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <Feather className="h-5 w-5 text-primary" />
                <span className="font-display text-lg font-semibold">Bishnupriya Manipuri</span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A digital archive dedicated to preserving the Bishnupriya Manipuri language, folklore, and cultural heritage across Assam, Tripura, Manipur, and Bangladesh.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">Collections</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/articles" className="text-muted-foreground transition-colors hover:text-foreground">Articles & Research</Link></li>
                <li><Link href="/articles?category=folk-stories" className="text-muted-foreground transition-colors hover:text-foreground">Folk Stories</Link></li>
                <li><Link href="/articles?category=vocabulary" className="text-muted-foreground transition-colors hover:text-foreground">Vocabulary</Link></li>
                <li><Link href="/resources" className="text-muted-foreground transition-colors hover:text-foreground">Learning Resources</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">Community</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-muted-foreground transition-colors hover:text-foreground">About the Archive</Link></li>
                <li><Link href="/contact" className="text-muted-foreground transition-colors hover:text-foreground">Contact & Contribute</Link></li>
              </ul>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href="mailto:archive@bmanipuri.org" className="transition-colors hover:text-foreground">archive@bmanipuri.org</a>
              </div>
            </div>
          </div>
        </ManuscriptBorder>

        <div className="mt-8 flex flex-col items-center gap-2 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Bishnupriya Manipuri Language Archive</p>
          <p>Preserving heritage across borders and generations</p>
        </div>
      </div>
    </footer>
  );
}
