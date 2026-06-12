'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Sun, Moon, Menu, Scroll, Home, FileText, Library, Mail, Feather } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/articles', label: 'Articles', icon: FileText },
  { href: '/resources', label: 'Resources', icon: Library },
  { href: '/about', label: 'About', icon: Scroll },
  { href: '/contact', label: 'Contact', icon: Mail },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? 'border-border/40 bg-background/80 backdrop-blur-xl shadow-sm'
          : 'border-border/30 bg-background/60 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Feather className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
          <div className="hidden sm:block">
            <span className="font-display text-lg font-semibold tracking-tight text-foreground">
              Bishnupriya Manipuri
            </span>
            <span className="ml-1.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Archive
            </span>
          </div>
          <span className="font-display text-lg font-semibold tracking-tight sm:hidden">
            BM Archive
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href + '/'));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-primary/5'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-primary transition-all duration-300" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
            className="rounded-full hover:bg-primary/10"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] border-border/50 bg-background p-6">
              <div className="flex flex-col gap-6">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <Feather className="h-6 w-6 text-primary" />
                  <span className="font-display text-lg font-semibold">Bishnupriya Manipuri</span>
                </Link>
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-primary/10 text-foreground border-l-2 border-primary'
                            : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
                        }`}
                      >
                        <link.icon className="h-4 w-4" />
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
