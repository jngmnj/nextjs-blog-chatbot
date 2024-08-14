import { cn } from '@/utils/style';
import { ComponentPropsWithoutRef, FC } from 'react';

type ButtonProps = ComponentPropsWithoutRef<'button'>;

const Button: FC<ButtonProps> = ({ children, className, ...rest }) => {
  return (
    <button
      className={cn(
        'w-full rounded-md bg-gray-800 px-2 py-2 text-white hover:bg-gray-900',
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
