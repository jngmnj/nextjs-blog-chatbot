import { cn } from '@/utils/style';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { FC } from 'react';
import { AiFillGithub, AiFillInstagram, AiOutlineClose } from 'react-icons/ai';
import IconButton from '../IconButton';

interface SidebarProps {
  close: () => void;
  isOpen: boolean;
}

const supabase = createClient();

const Sidebar: FC<SidebarProps> = ({ close, isOpen }) => {
  // react-query
  const { data: existingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await supabase.from('Post').select('category');
      return Array.from(new Set(data?.map((d) => d.category)));
    },
  });

  return (
    <div
      className={cn(
        'absolute z-10 min-h-screen flex-col gap-6 border-r bg-white p-10 pr-6 lg:relative',
        isOpen ? 'flex' : 'hidden',
      )}
      onClick={() => close()}
    >
      <div className="flex cursor-pointer justify-end lg:hidden">
        <IconButton Icon={AiOutlineClose} onClick={close} />
      </div>
      <Link href="/" className="w-48 font-medium text-gray-600 hover:underline">
        홈
      </Link>
      <Link
        href="/tags"
        className="w-48 font-medium text-gray-600 hover:underline"
      >
        태그
      </Link>
      {existingCategories?.map((category) => (
        <Link
          href={`/categories/${category}`}
          className="w-48 font-medium text-gray-600 hover:underline"
        >
          {category}
        </Link>
      ))}
      <div className="mt-10 flex items-center gap-4">
        <IconButton
          Icon={AiFillInstagram}
          component={Link}
          href="https://www.instagram.com/jngmnj"
          target="_blank"
        />
        <IconButton
          Icon={AiFillGithub}
          component={Link}
          href="https://www.github.com/jngmnj"
          target="_blank"
        />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fjngmnj-nextjs-blog.vercel.app&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=%EB%B0%A9%EB%AC%B8%EC%9E%90&edge_flat=false"
        alt="방문자뱃지"
      />
    </div>
  );
};

export default Sidebar;
