import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Feather, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20">
      <Feather className="h-12 w-12 text-primary/60 mb-6" />
      <h1 className="font-display text-4xl font-bold tracking-tight">Page Not Found</h1>
      <p className="mt-3 max-w-md text-center text-muted-foreground leading-relaxed">
        The page you are looking for does not exist in our archive. It may have been moved, or the link may be incorrect.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/">
          <Button className="gap-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
            <ArrowLeft className="h-4 w-4" />
            Return to Archive
          </Button>
        </Link>
        <Link href="/articles">
          <Button variant="outline" className="rounded-md border-border/50">
            Browse Articles
          </Button>
        </Link>
      </div>
    </div>
  );
}
