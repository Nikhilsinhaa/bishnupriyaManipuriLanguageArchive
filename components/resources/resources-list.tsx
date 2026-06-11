import { supabase, type Resource } from '@/lib/supabase';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ExternalLink, Download, BookOpen, Video, Headphones, Link2 } from 'lucide-react';

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

export async function ResourcesList() {
  let resources: Resource[] | null;
  try {
    const result = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });
    resources = result.data;
  } catch {
    resources = null;
  }

  const categories = Array.from(
    new Set(
      (resources || [])
        .map((r) => r.category)
        .filter((c): c is string => typeof c === 'string' && c.length > 0),
    ),
  );

  return (
    <div className="space-y-16">
      {categories.map((category) => {
        const categoryResources = (resources || []).filter((r) => r.category === category);
        return (
          <div key={category}>
            <h2 className="font-display text-2xl font-bold mb-6 capitalize flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              {category}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categoryResources.map((resource) => (
                <Card key={resource.id} className="h-full flex flex-col border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${typeColors[resource.type] || 'bg-muted'}`}
                      >
                        {typeIcons[resource.type] || <FileText className="h-3 w-3" />}
                        {resource.type}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-semibold leading-tight">
                      {resource.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
                      {resource.description || 'No description available.'}
                    </p>
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
                          className="w-full gap-2 rounded-md border-border/50"
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
                          className="w-full gap-2 rounded-md border-border/50"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Download
                        </Button>
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}

      {(!resources || resources.length === 0) && (
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
