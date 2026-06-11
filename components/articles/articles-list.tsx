import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';

const PAGE_SIZE = 9;

export async function ArticlesList({
  searchParams,
}: {
  searchParams: { search?: string; category?: string; page?: string };
}) {
  const page = parseInt(searchParams.page || '1', 10);
  const rawSearch = searchParams.search || '';
  const categorySlug = searchParams.category || '';

  // Escape PostgREST filter metacharacters to prevent filter injection
  const search = rawSearch.replace(/[%_]/g, '\\$&');

  let categoryId: string | null = null;
  if (categorySlug) {
    try {
      const { data: cat } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .maybeSingle();
      if (cat) categoryId = cat.id;
    } catch {
      // Category lookup failed
    }
  }

  let articles = null;
  let count = 0;
  try {
    let query = supabase
      .from('articles')
      .select('*, categories(name, slug)', { count: 'exact' })
      .not('published_at', 'is', null)
      .order('published_at', { ascending: false });

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
    }

    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);

    const result = await query;
    articles = result.data;
    count = result.count || 0;
  } catch {
    // Supabase unavailable
  }
  const totalPages = Math.ceil((count || 0) / PAGE_SIZE);

  const buildPageUrl = (p: number) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (categorySlug) params.set('category', categorySlug);
    params.set('page', String(p));
    return `/articles?${params.toString()}`;
  };

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">No articles found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link key={article.id} href={`/article/${article.slug}`} className="group">
            <Card className="h-full border-border/50 transition-all hover:border-primary/20 hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  {article.categories?.name && (
                    <Badge variant="secondary" className="text-xs rounded-md">
                      {article.categories.name}
                    </Badge>
                  )}
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {article.published_at
                      ? new Date(article.published_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : ''}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {article.excerpt || 'Read more about this topic...'}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-3">
          {page > 1 && (
            <Link href={buildPageUrl(page - 1)}>
              <Button variant="outline" size="sm" className="rounded-md border-border/50">
                Previous
              </Button>
            </Link>
          )}
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link href={buildPageUrl(page + 1)}>
              <Button variant="outline" size="sm" className="rounded-md border-border/50 gap-1">
                Next
                <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
