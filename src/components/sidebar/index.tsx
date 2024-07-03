import { cn } from '@/utils/style';
import Link from 'next/link';
import { FC } from 'react';
import { AiFillGithub, AiFillInstagram, AiOutlineClose } from 'react-icons/ai';
import IconButton from '../IconButton';

interface SidebarProps {
  close: () => void;
  isOpen: boolean;
}

const Sidebar: FC<SidebarProps> = ({ close, isOpen }) => {
  return (
    <div
      className={cn(
        'absolute min-h-screen flex-col gap-6 border-r bg-white p-10 pr-6 lg:relative',
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
        href="/tag"
        className="w-48 font-medium text-gray-600 hover:underline"
      >
        태그
      </Link>
      <Link
        href="/category/Web-Development"
        className="w-48 font-medium text-gray-600 hover:underline"
      >
        Web Development
      </Link>
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
    </div>
  );
};

export default Sidebar;
