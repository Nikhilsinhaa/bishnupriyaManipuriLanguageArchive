import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';

export async function FeaturedArticles() {
  const { data: articles } = await supabase
    .from('articles')
    .select('*, categories(name, slug)')
    .eq('is_featured', true)
    .not('published_at', 'is', null)
    .order('published_at', { ascending: false })
    .limit(3);

  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 bg-[hsl(var(--background))]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="h-px w-6 bg-primary/40" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Research</span>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight">Featured Articles</h2>
            <p className="mt-2 text-muted-foreground">Scholarship and writing about our language and culture</p>
          </div>
          <Link href="/articles" className="hidden sm:block">
            <Button variant="ghost" className="gap-2 text-primary hover:text-primary hover:bg-primary/5">
              View all
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link key={article.id} href={`/article/${article.slug}`} className="group">
              <Card className="h-full border-border/50 transition-all hover:border-primary/20 hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {article.categories?.name && (
                      <Badge variant="secondary" className="text-xs">
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
                    {article.excerpt || 'Read more about this fascinating topic...'}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Link href="/articles">
            <Button variant="ghost" className="gap-2 text-primary">
              View all articles
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
