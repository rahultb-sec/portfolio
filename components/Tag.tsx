'use client';

import React from 'react';

interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'subtle';
  size?: 'sm' | 'md';
  className?: string;
}

export function Tag({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
}: TagProps) {
  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs sm:text-sm',
  };

  const variantStyles = {
    default:
      'bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-dark-text border border-light-border dark:border-dark-border font-medium rounded-md',
    accent:
      'bg-purple-100/80 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50 font-medium rounded-md',
    subtle:
      'bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50 font-normal rounded-md',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 leading-tight tracking-tight transition-colors ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
