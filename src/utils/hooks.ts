import { useQuery } from '@tanstack/react-query';
import { createClient } from './supabase/client';

const supabase = createClient();

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await supabase.from('Post').select('category');
      return Array.from(new Set(data?.map((d) => d.category)));
    },
  });

export const useTags = () =>
  useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const { data } = await supabase.from('Post').select('tags');
      return Array.from(
        new Set(
          data?.flatMap((d) => {
            try {
              return JSON.parse(d.tags);
            } catch (e) {
              // console.log('Error', e);
              return [];
            }
          }),
        ),
      );
    },
  });
// 에러 처리안하면 출력 안됨
// supabase에서 가져온 데이터의 구조가 문자열로 인코딩된 JSON이기 때문일 가능성이 크다
// data?.flatMap((d) => JSON.parse(d.tags))를 통해 tags 필드를 파싱하고 있지만,
// 데이터의 형식에 따라 이 과정이 예상대로 동작하지 않을 수 있다.
