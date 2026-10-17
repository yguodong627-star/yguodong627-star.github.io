import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const buttonVariants = cva('inline-flex items-center justify-center gap-3 whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 disabled:pointer-events-none disabled:opacity-50', {
  variants: { variant: { default: 'liquid-glass text-white hover:scale-[1.03]', ghost: 'rounded-full text-white/70 hover:bg-white/10 hover:text-white' }, size: { default: 'rounded-full px-6 py-3', lg: 'rounded-full px-9 py-4', icon: 'size-11 rounded-full' } },
  defaultVariants: { variant: 'default', size: 'default' },
});
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean }
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={twMerge(clsx(buttonVariants({ variant, size }), className))} ref={ref} {...props} />;
});
Button.displayName = 'Button';
