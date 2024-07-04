import { createClient } from '@/utils/supabase/server';
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

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const { id } = query;

  const supabase = createClient(req.cookies);

  const response = await supabase.from("Post").select("*");
  
  console.log(response);
  
  return {
    props: {
      id,
    },
  };
};
