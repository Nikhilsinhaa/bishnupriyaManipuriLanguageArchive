import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, Clock } from 'lucide-react';

const PAGE_SIZE = 9;

export async function ArticlesList({
  searchParams,
}: {
  searchParams: { search?: string; category?: string; page?: string };
}) {
  const page = parseInt(searchParams.page || '1', 10);
  const rawSearch = searchParams.search || '';
  const categorySlug = searchParams.category || '';

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
        {articles.map((article) => {
          const textContent = article.content?.replace(/[#*_`\[\]()>|~-]/g, '') || '';
          const readingTime = Math.ceil(textContent.split(/\s+/).filter(Boolean).length / 200) || 1;

          return (
            <Link key={article.id} href={`/article/${article.slug}`} className="group">
              <div className="archive-card h-full overflow-hidden">
                {article.cover_image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.cover_image}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />
                    {article.categories?.name && (
                      <div className="absolute top-3 left-3">
                        <Badge className="gap-1 rounded-md bg-background/90 backdrop-blur-sm text-foreground border-border/30 hover:bg-background/90">
                          {article.categories.name}
                        </Badge>
                      </div>
                    )}
                  </div>
                )}

                <div className="p-5 sm:p-6">
                  {!article.cover_image && article.categories?.name && (
                    <Badge variant="secondary" className="mb-3 text-xs rounded-md">
                      {article.categories.name}
                    </Badge>
                  )}

                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {article.published_at
                        ? new Date(article.published_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : ''}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {readingTime} min
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {article.excerpt || 'Read more about this topic...'}
                  </p>

                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-all duration-200 group-hover:gap-2.5">
                    Read article
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-3">
          {page > 1 && (
            <Link href={buildPageUrl(page - 1)}>
              <Button variant="outline" size="sm" className="rounded-lg border-border/50">
                Previous
              </Button>
            </Link>
          )}
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link href={buildPageUrl(page + 1)}>
              <Button variant="outline" size="sm" className="rounded-lg border-border/50 gap-1">
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
