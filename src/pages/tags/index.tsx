import { useTags } from '@/utils/hooks';
import Link from 'next/link';

const Tag = () => {
  const { data: existingTags } = useTags();

  // console.log('Tags', existingTags);
  return (
    <div className="flex flex-col items-center gap-2 px-4 pb-24 pt-20">
      <h1 className="mb-8 text-center text-2xl font-semibold">태그</h1>
      <div className="container flex flex-wrap justify-center gap-2">
        {existingTags?.map((tag) => (
          <Link
            href={`/tags/${tag}`}
            key={tag}
            className="text-xl text-gray-500 underline hover:text-gray-800"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tag;
