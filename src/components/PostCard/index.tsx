import { Post } from '@/types';
import { cn } from '@/utils/style';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

export type PostCardProps = Omit<Post, 'tags'> & {
  className?: string;
};

const PostCard: FC<PostCardProps> = ({
  id,
  title,
  category,
  // tags,
  content,
  created_at,
  preview_image_url,
  className,
}) => {
  return (
    <Link href={`/posts/${id}`} className={cn('bg-white', className)}>
      <div className="relative aspect-[1.8/1] w-full">
        <Image
          src={preview_image_url ?? '/default.png'}
          fill
          sizes="360px"
          alt={title}
          priority={true}
          className="object-cover"
        />
      </div>
      <div className="p-2">
        <span className="mb-2 rounded-md bg-slate-100 px-2 py-1 text-xs">
          {category}
        </span>
        <h2 className="mb-3 text-lg font-medium">{title}</h2>
        <p className="line-clamp-3 text-sm text-gray-500">{content}</p>
        <div className="mt-4 text-sm text-gray-500">
          <span className="mx-1">
            {format(new Date(created_at), 'yyyy년 M월 d일 HH:mm')}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
