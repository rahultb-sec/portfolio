'use client';

import React from 'react';
import Link from 'next/link';


interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  linkHref?: string;
  linkText?: string;
  centered?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  badge,
  linkHref,
  linkText = 'View All',
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 ${centered ? 'text-center items-center sm:items-center' : ''}`}>
      <div className="space-y-1.5">
        {badge && (
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-purple-700 dark:text-purple-400">
            {badge}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-light-text dark:text-dark-text">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm sm:text-base text-light-muted dark:text-dark-muted max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      {linkHref && (
        <Link
          href={linkHref}
          className="inline-flex items-center text-sm font-medium text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300 transition-colors shrink-0"
        >
          <span>{linkText}</span>
        </Link>
      )}
    </div>
  );
}
