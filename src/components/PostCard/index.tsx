import { Post } from "@/types";
import { cn } from "@/utils/style";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type PostCardProps = Post & {
    className?: string;
}

const PostCard: FC<PostCardProps> = ({
  id,
  title,
  category,
  tags,
  content,
  created_at,
  preview_image_url,
  className,
}) => {
  return (
    <Link href={`/posts/${id}`}>
      <a className={cn('bg-white', className)}>
        <Image src={preview_image_url} width={0} height={0} sizes="100vw" alt={title} className="h-auto w-full" />
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-2 text-gray-600">{content}</p>
        <div className="mt-4 text-sm text-gray-500">
          <span>{category}</span>
          <span className="mx-1">•</span>
          <span>{tags.join(', ')}</span>
        </div>
      </a>
    </Link>
  );
};

export default PostCard