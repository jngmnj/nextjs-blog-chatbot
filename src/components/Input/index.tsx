import { cn } from '@/utils/style';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

type InputProps = ComponentPropsWithoutRef<'input'>;

// 리액트에서 특정 도큐멘트에 접근할때 useRef 를 쓰는데
// 컴포넌트별로 ref 전달을 해주게끔 도와주는 역할
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...rest }, ref) => {
    return (
      <input
        className={cn(
          'rounded-md border border-gray-300 p-2 transition-all hover:border-gray-400',
          className,
        )}
        ref={ref}
        {...rest}
      />
    )
  })

export default Input

Input.displayName = 'Input';