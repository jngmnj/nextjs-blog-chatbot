import Input from '@/components/Input';
import { createClient } from '@/utils/supabase/client';
import { UserResponse } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';

const supabase = createClient();

const Admin = () => {
  const router = useRouter();
  const [userResponse, setUserResponse] = useState<UserResponse>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await supabase.auth.signInWithPassword({
      email: emailRef.current?.value ?? '',
      password: passwordRef.current?.value ?? '',
    });

    if (!response.data.user) {
      return alert('로그인에 실패했습니다.');
    }

    router.refresh();
  };

  useEffect(() => {
    (async () => {
      const user = await supabase.auth.getUser();
      setUserResponse(user);
    })(); // useEffect내에서는 이렇게 감싸야됨
  }, []);

  return (
    <div className="container mx-auto flex flex-col px-4 pb-20 pt-12">
      {!!userResponse?.data.user ? (
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-medium">
              {userResponse.data.user.email}님 안녕하세요.
            </h1>
            <p className="text-sm text-gray-500">
              {userResponse.data.user.role}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                router.push('/');
              }}
              className="rounded-md bg-gray-800 px-2 py-2 text-white"
            >
              로그아웃
            </button>
            <button
              onClick={() => {
                router.push('/write');
              }}
              className="flex items-center gap-1 rounded-md border border-black bg-white px-2 py-2 text-black"
            >
              <BsPencilSquare />
              글작성
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <h1 className="text-2xl font-medium">관리자 로그인</h1>
          <form onSubmit={handleSumbit}>
            <div className="flex flex-col gap-3">
              <Input type="text" placeholder="이메일" ref={emailRef} />
              <Input type="password" placeholder="비밀번호" ref={passwordRef} />
            </div>
            <button
              type="submit"
              className="mt-4 w-full rounded-md bg-gray-800 py-2 text-white"
            >
              로그인
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;
