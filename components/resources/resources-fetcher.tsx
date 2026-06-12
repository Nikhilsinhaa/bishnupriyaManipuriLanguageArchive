import { supabase, type Resource } from '@/lib/supabase';
import { ResourcesList } from './resources-list';

export async function ResourcesFetcher() {
  let resources: Resource[] | null;
  try {
    const result = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });
    resources = result.data;
  } catch {
    resources = [];
  }

  return <ResourcesList resources={resources || []} />;
}
