import PostCard from '@/components/PostCard';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';

type TagPostsProps = {
    tag: string;
};

const supabase = createClient();
const TagPosts = ({tag}: TagPostsProps) => {
  const { data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data } = await supabase
        .from('Post')
        .select('*')
        .like('tags', `%${tag}%`)
        .order('created_at', { ascending: false });
      if (!data) return [];
      return data;
    },
  });

  return (
    
    <div className="flex flex-col items-center pt-10">
      <h1 className='text-2xl font-medium mb-5'># {tag}</h1>
      <div className="gap-y-6 lg:gap-x-7 container mx-auto grid grid-cols-2 gap-x-3 px-4 pb-24 lg:gap-y-12">
        {posts?.map((post) => (
          <PostCard {...post} className="bg-white" key={post.id} />
        ))}
      </div>
    </div>
  );
}

export default TagPosts;

export const getServerSideProps:GetServerSideProps<TagPostsProps> = async ({query}) => {
  return {
    props: {
        tag: query.tag as string,
    }
  }
}