import { Post, PostRequest } from '@/types';
import { createClient } from '@/utils/supabase/server';
import type { StorageError } from '@supabase/storage-js';
import formidable from 'formidable';
import { readFileSync } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post> | StorageError,
) {
  const form = formidable();

  // formdata에 있는 fields와 files이 return됨
  const [fields, files] = await form.parse(req);

  let preview_image_url: string | null = null;

  const supabase = await createClient(req.cookies);

  // file을 supabase storage에 업로드하고
  // 업로드된 이미지의 public url을 가져와서 preview_image_url에 저장
  if (files.preview_image?.length === 1) {
    const file = files.preview_image[0];
    const fileContent = await readFileSync(file.filepath);
    const fileName = `${file.newFilename}_${file.originalFilename}`;
    const { data: uploadData, error } = await supabase.storage
      .from('blog-image')
      .upload(fileName, fileContent, {
        contentType: file.mimetype ?? undefined,
      });
    if (error) {
      res.status(403).json(error);
      // end();
    }
    if (uploadData?.path) {
      const { data } = await supabase.storage
        .from('blog-image')
        .getPublicUrl(uploadData.path);
      preview_image_url = data.publicUrl;
    }
  }

  const { title, category, tags, content } = fields;

  const postRequest = {
    title: title?.[0],
    category: category?.[0],
    tags: tags?.[0],
    content: content?.[0],
    preview_image_url,
  } as PostRequest;

  const { data } = await supabase.from('Post').insert([postRequest]).select();

  if (data && data.length === 1) {
    // tags는 parsing 필요
    const { tags, ...reset } = data[0];
    res.status(200).json({
      ...reset,
      tags: JSON.parse(tags) as string[],
    });
  } else res.status(500).end();
}

// bodyParser가 기본적으로 true
//
export const config = {
  api: {
    bodyParser: false,
  },
};
