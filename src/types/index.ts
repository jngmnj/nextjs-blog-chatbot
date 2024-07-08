import { Database } from './supabase';

// 추가적으로 tags 한번 래핑 필요
export type Post = Omit<Database['public']['Tables']['Post']['Row'], 'tags'> & {
  tags: string[];
};

export type PostRequest = Database['public']['Tables']['Post']['Insert'];
