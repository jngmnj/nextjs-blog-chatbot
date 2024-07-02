import { cva } from '@/utils/style';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

const button = cva('flex- flex');
export default function Home() {
  supabase
    .from('Test')
    .select('*')
    .then((res) => {
      const data = res.data;
      console.log(data);
    });

  return (
    <main className="h-[2000px]">
      <h1>Hello world!</h1>
    </main>
  );
}
