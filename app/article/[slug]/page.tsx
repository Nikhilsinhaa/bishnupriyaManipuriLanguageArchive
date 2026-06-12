import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, ArrowLeft, Clock, Tag } from 'lucide-react';
import Script from 'next/script';
import { ManuscriptBorder } from '@/components/shared/manuscript-border';
import { MarkdownContent } from '@/components/shared/markdown-content';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  try {
    const { data: article } = await supabase
      .from('articles')
      .select('title, meta_description, excerpt')
      .eq('slug', params.slug)
      .not('published_at', 'is', null)
      .maybeSingle();

    if (!article) {
      return {
        title: 'Article Not Found',
      };
    }

    return {
      title: article.title,
      description: article.meta_description || article.excerpt || '',
    };
  } catch {
    return {
      title: 'Article',
    };
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  let article;
  try {
    const result = await supabase
      .from('articles')
      .select('*, categories(name, slug)')
      .eq('slug', params.slug)
      .not('published_at', 'is', null)
      .maybeSingle();
    article = result.data;
  } catch {
    notFound();
  }

  if (!article) {
    notFound();
  }

  let relatedArticles;
  try {
    const result = await supabase
      .from('articles')
      .select('title, slug, excerpt, published_at')
      .eq('category_id', article.category_id)
      .neq('id', article.id)
      .not('published_at', 'is', null)
      .order('published_at', { ascending: false })
      .limit(3);
    relatedArticles = result.data;
  } catch {
    // Related articles are non-critical
  }

  // Strip Markdown syntax for reading time calculation
  const textContent = article.content?.replace(/[#*_`\[\]()>|~-]/g, '') || '';
  const readingTime = Math.ceil(textContent.split(/\s+/).filter(Boolean).length / 200) || 1;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.meta_description || article.excerpt || '',
    author: {
      '@type': 'Organization',
      name: 'Bishnupriya Manipuri Language Archive',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bishnupriya Manipuri Language Archive',
    },
    datePublished: article.published_at,
    dateModified: article.updated_at,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://bmanipuri.org/article/${params.slug}`,
    },
  };

  return (
    <div>
      <Script id="article-json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="border-b border-border/50 bg-[hsl(var(--secondary))]/50 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link href="/articles">
            <Button variant="ghost" className="mb-6 gap-2 pl-0 hover:pl-2 transition-all rounded-md text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Articles
            </Button>
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {article.categories?.name && (
              <Link href={`/articles?category=${article.categories.slug}`}>
                <Badge className="gap-1 rounded-md">
                  <Tag className="h-3 w-3" />
                  {article.categories.name}
                </Badge>
              </Link>
            )}
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {article.published_at
                ? new Date(article.published_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : ''}
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {readingTime} min read
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {article.cover_image && (
          <img
            src={article.cover_image}
            alt={article.title}
            className="mb-8 w-full rounded-xl object-cover"
          />
        )}

        <ManuscriptBorder variant="top" />
        <article className="prose prose-lg max-w-none dark:prose-invert prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-headings:font-display prose-headings:font-semibold">
          <MarkdownContent content={article.content || ''} />
        </article>
        <ManuscriptBorder variant="bottom" />

        {relatedArticles && relatedArticles.length > 0 && (
          <>
            <Separator className="my-12" />
            <div>
              <h3 className="font-display text-2xl font-bold mb-6">Related Articles</h3>
              <div className="space-y-4">
                {relatedArticles.map((rel) => (
                  <Link key={rel.slug} href={`/article/${rel.slug}`} className="group block">
                    <div className="rounded-lg border border-border/50 p-4 transition-all hover:bg-[hsl(var(--secondary))]/50">
                      <h4 className="font-display font-semibold group-hover:text-primary transition-colors">
                        {rel.title}
                      </h4>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {rel.excerpt || ''}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
