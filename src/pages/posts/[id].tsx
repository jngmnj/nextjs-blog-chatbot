import { GetServerSideProps } from 'next';

type PostProps = {
  id: string;
};

const Post = ({ id }: PostProps) => {
  return (
    <div className="flex">
      <h1>post{id}</h1>
    </div>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;
  return {
    props: {
      id,
    },
  };
};
