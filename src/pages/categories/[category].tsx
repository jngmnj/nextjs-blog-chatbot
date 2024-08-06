import PostCard from '@/components/PostCard';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';

type CategoryPostsProps = {
    category: string;
};

const supabase = createClient();
const CategoryPosts = ({category}: CategoryPostsProps) => {
  const { data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data } = await supabase
        .from('Post')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });
      if (!data) return [];
      return data;
    },
  });

  return (
    <div className="flex flex-col items-center pt-10">
      <h1 className="mb-5 text-2xl font-medium">{category}</h1>
      <div className="container mx-auto grid grid-cols-2 gap-x-3 gap-y-6 px-4 pb-24 lg:gap-x-7 lg:gap-y-12">
        {posts?.map((post) => (
          <PostCard {...post} className="bg-white" key={post.id} />
        ))}
      </div>
    </div>
  );
}

export default CategoryPosts;

export const getServerSideProps:GetServerSideProps<CategoryPostsProps> = async ({query}) => {
  return {
    props: {
        category: query.category as string,
    }
  }
}