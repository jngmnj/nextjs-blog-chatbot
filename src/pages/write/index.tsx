import { MarkdownEditor } from '@/components/Markdown';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FormEvent, useRef, useState } from 'react';
import ReactSelect from 'react-select';

const supabase = createClient();

const Write = () => {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');

  // react-query 
  const {data: existingCategories} = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await supabase.from('Post').select('category');
      return Array.from(new Set(data?.map((d) => d.category)));
    }
  });

  const {data: existingTags} = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const { data } = await supabase.from('Post').select('tags');
      return Array.from(
        new Set(data?.flatMap((d) => JSON.parse(d.tags)))
      );
    }
  });

  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('[]');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 일반적으로는 요청을할때 json 형태로 보내면되는데
    // file, 이미지는 전달이 안돼서 formdata를 활용함
    const formData = new FormData();

    // 각각 요소 append
    formData.append('title', title);
    formData.append('category', category);
    formData.append('tags', tags);
    formData.append('content', content);

    // 이미지 파일이 있으면 preview image도 만듦
    if (fileRef.current?.files?.[0]) {
      formData.append('preview_image', fileRef.current.files[0]);
    }

    const response = await fetch('/api/posts', {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
      body: formData,
    });

    const data = await response.json();

    // post성공시 해당 post로 redirect
    if (data.id) router.push(`/posts/${data.id}`);
  };

  return (
    <div className="container mx-auto flex flex-col px-4 pb-20 pt-12">
      <h1 className="mb-8 text-2xl font-medium">글쓰기</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="제목"
            className="rounded-md border border-gray-300 p-2 transition-all hover:border-gray-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="file"
            // 이미지파일만 받음
            accept="imgage/*"
            className="rounded-md border border-gray-300 p-2 transition-all hover:border-gray-400"
            ref={fileRef}
          />
          <ReactSelect
            options={(existingCategories ?? []).map((category) => ({
              label: category,
              value: category,
            }))}
            placeholder="카테고리"
            isMulti={false}
            onChange={(e) => e && setCategory(e?.value)}
          />
          <ReactSelect
            options={(existingTags ?? []).map((tag) => ({
              label: tag,
              value: tag,
            }))}
            placeholder="태그"
            onChange={(e) =>
              e && setTags(JSON.stringify(e.map((e) => e.value)))
            }
            isMulti
          />
          <MarkdownEditor
            height={500}
            value={content}
            onChange={(s) => setContent(s ?? '')}
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-gray-800 py-2 text-white"
        >
          작성하기
        </button>
      </form>
    </div>
  );
};

export default Write;