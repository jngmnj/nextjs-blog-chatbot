import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

const supabase = createClient();

const Tag = () => {
  const { data: existingTags } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const { data } = await supabase.from('Post').select('tags');

      //   console.log('Data', data);

      // 에러 처리안하면 출력 안됨
      // supabase에서 가져온 데이터의 구조가 문자열로 인코딩된 JSON이기 때문일 가능성이 크다
      // data?.flatMap((d) => JSON.parse(d.tags))를 통해 tags 필드를 파싱하고 있지만,
      // 데이터의 형식에 따라 이 과정이 예상대로 동작하지 않을 수 있다.
      return Array.from(
        new Set(
          data?.flatMap((d) => {
            try {
              return JSON.parse(d.tags);
            } catch (e) {
              console.log('Error', e);
              return [];
            }
          }),
        ),
      );
      //   return Array.from(new Set(data?.flatMap((d) => JSON.parse(d.tags))));
    },
  });

  console.log('Tags', existingTags);
  return (
    <div className="flex flex-col items-center gap-2 px-4 pb-24 pt-20">
      <h1 className="mb-8 text-center text-2xl font-semibold">태그</h1>
      <div className="px10 container mx-auto flex flex-wrap justify-center gap-2">
        {existingTags?.map((tag) => (
          <Link
            href={`/tags/${tag}`}
            key={tag}
            className="text-xl text-gray-500 underline hover:text-gray-800"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tag;
