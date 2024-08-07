import { cn } from "@/utils/style";
import { createClient } from "@/utils/supabase/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FC, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import PostCard from "../PostCard";

const supabase = createClient();

type PostListProps = {
    category?: string;
    tag?: string;
    className?: string;
}
const PostList: FC<PostListProps> = ({
    category,
    tag,
    className,
}) => {
  const { ref, inView } = useInView(); // observing할 요소에 ref걸기
  const {
    data: postPages,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam }) => {
        let request = supabase.from('Post').select('*');
        if (category) request = request.eq('category', category);
        if (tag) request = request.like('tags', `%${tag}%`);

      const { data } = await request
        .range(pageParam, pageParam + 9)
        .order('created_at', { ascending: false });

      // Supabase에서 받은 데이터가 없을 경우
      if (!data)
        return {
          posts: [],
          nextPage: null,
        };

      // 반환된 데이터의 길이를 이용해 다음 페이지 파라미터를 결정
      return {
        posts: data,
        nextPage: data.length === 10 ? pageParam + 10 : null,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className={cn('flex flex-col items-center gap-8 pt-20', className)}>
      <h1 className={cn('text-2xl font-medium', !category && !tag && 'hidden')}>
        {category ? category : `#${tag}`}
      </h1>
      <div className="gap-y-6lg:gap-x-7 container mx-auto grid grid-cols-2 gap-x-3 px-4 pb-24 lg:gap-y-12">
        {postPages?.pages
          .flatMap((page) => page.posts)
          .map((post) => (
            <PostCard {...post} className="bg-white" key={post.id} />
          ))}
      </div>
      <div ref={ref} />
    </div>
  );
};

export default PostList;
