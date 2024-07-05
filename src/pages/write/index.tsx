import { MarkdownEditor, MarkdownViewer } from '@/components/Markdown';
import { createClient } from '@/utils/supabase/server';
import { GetServerSideProps } from 'next';
import { useRef, useState } from 'react';
import ReactSelect from 'react-select';

type WriteProps = {
  existingTags: string[];
  existingCategories: string[];
};

const Write = ({ existingTags, existingCategories }: WriteProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('[]');
  const [content, setContent] = useState('');

  return (
    <div className="container mx-auto flex flex-col px-4 pb-20 pt-12">
      <h1 className="mb-8 text-2xl font-medium">글쓰기</h1>
      <form action="">
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
            options={existingCategories.map((category) => ({
              label: category,
              value: category,
            }))}
            placeholder="카테고리"
            isMulti={false}
            onChange={(e) => e && setCategory(e?.value)}
          />
          <ReactSelect
            options={existingTags.map((tag) => ({
              label: tag,
              value: tag,
            }))}
            placeholder="태그"
            onChange={(e) =>
              e && setTags(JSON.stringify(e.map((e) => e.value)))
            }
            isMulti
          />
          <MarkdownEditor height={500} />
          <MarkdownViewer />
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

export const getServerSideProps: GetServerSideProps<WriteProps> = async ({
  req,
}) => {
  const supabase = createClient(req.cookies);

  const { data } = await supabase.from('Post').select('category, tags');

  return {
    props: {
      existingCategories: Array.from(new Set(data?.map((d) => d.category))),
      existingTags: Array.from(
        new Set(data?.flatMap((d) => JSON.parse(d.tags))),
      ),
    },
  };
};
