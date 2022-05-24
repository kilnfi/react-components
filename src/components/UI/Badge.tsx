import React from 'react';

type Props = {
  color: 'green' | 'red' | 'orange' | 'gray' | 'yellow',
  children: any,
  className?: string,
  title?: string,
}

const Badge = ({ children, color, className = '', title = '' }: Props) => {
  const colorClasses = color === 'red' ? 'rc-bg-status-red'
    : color === 'green' ? 'rc-bg-status-green'
      : color === 'orange' ? 'rc-bg-status-orange'
        : color === 'yellow' ? 'rc-bg-yellow'
          : color === 'gray' ? 'rc-bg-gray-100' : '';

  return (
    <span
      className={`rc-px-3 rc-py-1.5 rc-inline-flex rc-text-body-2 rc-text-black rc-rounded-full ${colorClasses} ${className}`}
      title={title}
    >
      {children}
    </span>
  );
};

export default Badge;