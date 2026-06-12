'use client';

import { useState } from 'react';
import { supabase, type Resource } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, ExternalLink, Download, BookOpen, Video, Headphones, Link2, Filter } from 'lucide-react';

const typeIcons: Record<string, React.ReactNode> = {
  pdf: <FileText className="h-5 w-5" />,
  video: <Video className="h-5 w-5" />,
  audio: <Headphones className="h-5 w-5" />,
  link: <Link2 className="h-5 w-5" />,
};

const typeColors: Record<string, string> = {
  pdf: 'bg-red-50/60 text-red-800 dark:bg-red-950/20 dark:text-red-400',
  video: 'bg-blue-50/60 text-blue-800 dark:bg-blue-950/20 dark:text-blue-400',
  audio: 'bg-amber-50/60 text-amber-800 dark:bg-amber-950/20 dark:text-amber-400',
  link: 'bg-green-50/60 text-green-800 dark:bg-green-950/20 dark:text-green-400',
};

function getDownloadUrl(file_path: string): string {
  const { data } = supabase.storage.from('resources').getPublicUrl(file_path);
  return data?.publicUrl || '#';
}

export function ResourcesList({ resources }: { resources: Resource[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = Array.from(
    new Set(
      resources
        .map((r) => r.category)
        .filter((c): c is string => typeof c === 'string' && c.length > 0),
    ),
  );

  const filteredResources = activeCategory
    ? resources.filter((r) => r.category === activeCategory)
    : resources;

  return (
    <div className="space-y-8">
      {categories.length > 1 && (
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
              !activeCategory
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category === activeCategory ? null : category)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 capitalize ${
                category === activeCategory
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-16">
        {(activeCategory ? [activeCategory] : categories).map((category) => {
          const categoryResources = filteredResources.filter((r) => r.category === category);
          if (categoryResources.length === 0) return null;
          return (
            <div key={category}>
              <h2 className="font-display text-2xl font-bold mb-6 capitalize flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                {category}
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {categoryResources.map((resource) => (
                  <div key={resource.id} className="archive-card h-full flex flex-col overflow-hidden">
                    <div className="p-5 sm:p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium ${typeColors[resource.type] || 'bg-muted'}`}
                        >
                          {typeIcons[resource.type] || <FileText className="h-3.5 w-3.5" />}
                          {resource.type.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-semibold leading-tight mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-5 flex-1 leading-relaxed">
                        {resource.description || 'No description available.'}
                      </p>

                      <div className="mt-auto">
                        {resource.url && (
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full gap-2 rounded-lg border-border/50 hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all duration-200"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                              Access Resource
                            </Button>
                          </a>
                        )}
                        {resource.file_path && !resource.url && (
                          <a href={getDownloadUrl(resource.file_path)} download className="block">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full gap-2 rounded-lg border-border/50 hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all duration-200"
                            >
                              <Download className="h-3.5 w-3.5" />
                              Download
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {resources.length === 0 && (
        <div className="text-center py-20">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="font-display text-lg font-semibold mb-2">No Resources Yet</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Resources will be added soon. Check back for learning materials, vocabulary lists,
            downloadable PDFs, and more.
          </p>
        </div>
      )}
    </div>
  );
}
