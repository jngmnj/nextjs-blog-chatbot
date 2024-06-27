import { cx } from "class-variance-authority";
import type { ClassValue } from "class-variance-authority/types";
import { twMerge } from "tailwind-merge";

// utils에서 전체 관리
export * from 'class-variance-authority';
// export type * from 'class-variance-authority';

// twMerge와 cx 병합 함수
export const cn = (...args: ClassValue[]) => twMerge(cx(args));