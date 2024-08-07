import Input from "@/components/Input"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { useRef } from "react"

const supabase = createClient()

const Admin = () => {
    const router = useRouter()
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    
    const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await supabase.auth.signInWithPassword({
            email: emailRef.current?.value ?? '',
            password: passwordRef.current?.value ?? ''
        });

        if(!response.data.user) {
            return alert('로그인에 실패했습니다.')
        }

        router.refresh();
    }
  return (
    <div className="container mx-auto flex flex-col px-4 pb-20 pt-12">
        <div className="flex flex-col gap-8">
            <h1 className="text-2xl font-medium">관리자 로그인</h1>
            <form onSubmit={handleSumbit}>
                <div className="flex flex-col gap-3">
                    <Input type="text" placeholder="이메일" ref={emailRef} />   
                    <Input type="password" placeholder="비밀번호" ref={passwordRef} />
                </div>
                <button type="submit" className="mt-4 w-full rounded-md bg-gray-800 py-2 text-white">
                    로그인
                </button>
            </form>
        </div>
    </div>
  )
}

export default Admin