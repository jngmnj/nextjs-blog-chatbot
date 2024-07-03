import { cn } from '@/utils/style';
import { ComponentPropsWithoutRef, createElement, ElementType } from 'react';
import { IconType } from 'react-icons';

type IconButtonProps<Component extends ElementType> =
  ComponentPropsWithoutRef<Component> & {
    Icon: IconType;
    iconClassName?: string;
    className?: string;
    component?: Component;
  };

// generic을 이용하여 타입 추론이 자동으로 되게끔 한다.
// props가 컴포넌트의 속성으로 타입 추론이 되게끔.
const IconButton = <Component extends ElementType = 'button'>({
  component,
  iconClassName,
  className,
  Icon,
  ...props
}: IconButtonProps<Component>) => {
  return createElement(
    component ?? 'button',
    {
      className: cn('p-1.5 lg:p-2', className),
      ...props,
    },
    <Icon
      className={cn('h-5 w-5 transition-all lg:h-6 lg:w-6', iconClassName)}
    />,
  );
};

export default IconButton;
