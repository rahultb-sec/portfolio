'use client';

import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  external,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-lg',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-5 py-2.5 text-base rounded-xl',
  };

  const variantStyles = {
    primary:
      'bg-purple-700 hover:bg-purple-800 text-white dark:bg-purple-600 dark:hover:bg-purple-500 font-medium shadow-sm transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-dark-bg',
    secondary:
      'bg-light-secondary hover:bg-light-border dark:bg-dark-secondary dark:hover:bg-dark-border text-light-text dark:text-dark-text font-medium border border-light-border dark:border-dark-border transition-colors duration-200',
    outline:
      'bg-transparent hover:bg-light-secondary dark:hover:bg-dark-secondary text-light-text dark:text-dark-text font-medium border border-purple-200 dark:border-purple-900/60 transition-colors duration-200',
    ghost:
      'bg-transparent hover:bg-light-secondary dark:hover:bg-dark-secondary text-light-muted hover:text-light-text dark:text-dark-muted dark:hover:text-dark-text transition-colors duration-200',
  };

  const combinedClass = `inline-flex items-center justify-center gap-2 transition-transform active:scale-[0.98] ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClass}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClass}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClass} {...props}>
      {children}
    </button>
  );
}
