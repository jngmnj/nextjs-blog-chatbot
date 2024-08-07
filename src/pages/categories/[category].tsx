import PostList from '@/components/PostList.tsx';
import { GetServerSideProps } from 'next';

type CategoryPostsProps = {
    category: string;
};

const CategoryPosts = ({category}: CategoryPostsProps) => {
  return (
    <PostList category={category} />
  );
}

export default CategoryPosts;

export const getServerSideProps:GetServerSideProps<CategoryPostsProps> = async ({query}) => {
  return {
    props: {
        category: query.category as string,
    }
  }
}