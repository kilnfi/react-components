import React from 'react';

export function getButtonStyles(variant: variant, size: size) {
  return `rc-inline-flex
            rc-items-center
            rc-justify-center
            focus:rc-outline-none
            rc-transition
            rc-duration-150
            rc-ease-in-out
            disabled:rc-cursor-not-allowed
            rc-whitespace-no-wrap
            rc-rounded
            rc-no-underline
            rc-text-subtitle-2
            ${variant === 'primary' ? 'rc-text-white rc-bg-primary hover:rc-bg-primary-hover rc-border-0 focus:rc-bg-primary-pressed disabled:rc-bg-primary-disabled' : ''}
            ${variant === 'secondary' ? 'rc-text-black rc-bg-primary-tint-200 hover:rc-bg-primary-tint-100 rc-border rc-border-primary focus:rc-bg-primary-tint-300 disabled:rc-border-gray-200 disabled:rc-bg-white disabled:rc-text-gray-500' : ''}
            ${size === 'normal' ? 'rc-h-[56px] rc-px-6' : ''}
            ${size === 'small' ? 'rc-h-[40px] rc-px-4' : ''}
           `;
}

type variant = 'primary' | 'secondary'
type size = 'normal' | 'small'

type Props = {
  children: any,
  className?: string,
  href?: string,
  type?: 'button' | 'submit' | 'reset' | undefined,
  onClick?: () => void,
  disabled?: boolean,
  download?: boolean | string,
  variant?: variant,
  size?: size,
};

const Button = ({ children, className = '', href, type = 'button', variant = 'primary', size = 'normal', ...props }: Props) => {
  return (
    <button
      {...props}
      type={type}
      className={`${getButtonStyles(variant, size)} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
