'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';
import type { Category } from '@/lib/supabase';

export function ArticlesFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const currentCategory = searchParams.get('category');

  useEffect(() => {
    setSearch(searchParams.get('search') || '');
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set('search', search);
      params.delete('page');
    } else {
      params.delete('search');
    }
    router.push(`/articles?${params.toString()}`);
  };

  const handleCategory = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentCategory === slug) {
      params.delete('category');
    } else {
      params.set('category', slug);
      params.delete('page');
    }
    router.push(`/articles?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearch('');
    router.push('/articles');
  };

  return (
    <div className="mb-10 space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-md border-border/50 pl-9 focus-visible:ring-primary/20"
          />
        </div>
        <Button type="submit" className="rounded-md bg-primary text-primary-foreground hover:bg-primary/90">Search</Button>
        {(search || currentCategory) && (
          <Button variant="outline" onClick={clearFilters} type="button" className="rounded-md border-border/50">
            <X className="h-4 w-4" />
          </Button>
        )}
      </form>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategory(cat.slug)}
            className="transition-colors"
            aria-pressed={currentCategory === cat.slug}
          >
            <Badge
              variant={currentCategory === cat.slug ? 'default' : 'secondary'}
              className="cursor-pointer rounded-md text-sm px-3 py-1"
            >
              {cat.name}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  );
}
