import Button from '@/components/Button';
import Input from '@/components/Input';
import { MarkdownEditor } from '@/components/Markdown';
import { useCategories, useTags } from '@/utils/hooks';
import { useRouter } from 'next/router';
import { FormEvent, useRef, useState } from 'react';
import ReactSelect from 'react-select';

// type WriteProps = {
//   existingTags: string[];
//   existingCategories: string[];
// }
// const supabase = createClient();

const Write = () => {
  const router = useRouter();

  const titleRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // react-query
  const { data: existingCategories } = useCategories();

  const { data: existingTags } = useTags();

  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('[]');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 일반적으로는 요청을할때 json 형태로 보내면되는데
    // file, 이미지는 전달이 안돼서 formdata를 활용함

    if (!titleRef.current?.value || titleRef.current.value.length === 0)
      return alert('제목을 입력해주세요.');
    if (category.length === 0) return alert('카테고리를 선택해주세요.');
    if (tags.length === 0) return alert('태그를 입력해주세요.');
    if (content.length === 0) return alert('내용을 입력해주세요.');

    const formData = new FormData();

    // 각각 요소 append
    formData.append('title', titleRef.current?.value ?? '');
    formData.append('category', category);
    formData.append('tags', tags);
    formData.append('content', content);

    // 이미지 파일이 있으면 preview image도 만듦
    if (fileRef.current?.files?.[0]) {
      formData.append('preview_image', fileRef.current.files[0]);
    }

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });

      // const data = await response.json();
      const data = await response.json();

      // post성공시 해당 post로 redirect
      if (data.id) router.push(`/posts/${data.id}`);
    } catch (error) {
      // console.error('Error creating post:', error);
      alert('글 작성에 실패했습니다.');
    }
  };

  return (
    <div className="container flex flex-col pb-20 pt-12">
      <h1 className="mb-8 text-2xl font-medium">글쓰기</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <Input type="text" placeholder="제목" ref={titleRef} />
          <Input
            type="file"
            // 이미지파일만 받음
            accept="imgage/*"
            ref={fileRef}
          />
          <ReactSelect
            instanceId={'category'}
            options={(existingCategories ?? []).map((category) => ({
              label: category,
              value: category,
            }))}
            placeholder="카테고리"
            isMulti={false}
            onChange={(e) => e && setCategory(e?.value)}
          />
          <ReactSelect
            instanceId={'tags'}
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
        <Button type="submit" className="mt-4">
          작성하기
        </Button>
      </form>
    </div>
  );
};

export default Write;
