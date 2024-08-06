import PostCard from '@/components/PostCard';
import { createClient } from '@/utils/supabase/client';
import { useInfiniteQuery } from '@tanstack/react-query';

const supabase = createClient();


export default function Home() {
  const { data: postPages } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam }) => {
      const { data } = await supabase
        .from('Post')
        .select('*')
        .range(pageParam, pageParam + 9)
        .order('created_at', { ascending: false });
      if (!data) return [];
      return {
        posts: data, 
        nextPage: data.length === 10 ? pageParam + 10 : null
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.length,
  });


  return (
    <main className="h-[2000px]">
      <div className="gap-y-6lg:gap-x-7 container mx-auto grid grid-cols-2 gap-x-3 px-4 pb-24 lg:gap-y-12">
        {postPages?.pages
        .flatMap((posts) => posts)
        .map((post) => (
          <PostCard {...post} className="bg-white" key={post.id} />
        ))}
      </div>
    </main>
  );
}
