import Link from 'next/link';
import { FC } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { BsPencilSquare } from 'react-icons/bs';
import IconButton from '../IconButton';

const Footer: FC = () => {
  return (
    <footer className="flex justify-between border-t p-4 font-medium">
      <div className="flex items-center gap-2 lg:gap-3">
        <div className="pr-1 text-sm lg:pr-2 lg:text-base">About Me</div>
        <div className="text-xs text-gray-500 lg:text-sm">
          프론트엔드 엔지니어 지정민
        </div>
      </div>
      <div className="flex items-center gap-2 lg:gap-3">
        <div className="pr-1 text-sm lg:pr-2 lg:text-base">Admin</div>
        <IconButton Icon={AiOutlineSetting} component={Link} href="/admin" />
        <IconButton Icon={BsPencilSquare} component={Link} href="/write" />
      </div>
    </footer>
  );
};

export default Footer;
