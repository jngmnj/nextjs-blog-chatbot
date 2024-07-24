import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

const supabase = createClient();


export default function Home() {
  const {data: posts} = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data } = await supabase.from('Post').select('*').order('created_at', { ascending: false });
      if(!data) return [];
      return data;
    }
  })

  return (
    <main className="h-[2000px]">
      <div className="container mx-auto grid grid-cols-2 gap-x-3 gap-y-6lg:gap-x-7 lg:gap-y-12 px-4 pb-24">
        {posts?.map((post) => (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
