import PostList from '@/components/PostList.tsx';
import { GetServerSideProps } from 'next';

type TagPostsProps = {
    tag: string;
};

const TagPosts = ({tag}: TagPostsProps) => {
  return <PostList tag={tag} />
}

export default TagPosts;

export const getServerSideProps:GetServerSideProps<TagPostsProps> = async ({query}) => {
  return {
    props: {
        tag: query.tag as string,
    }
  }
}