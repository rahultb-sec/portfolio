'use client';

import React from 'react';
import Link from 'next/link';
import { BlogPostData } from '@/lib/cms';
import { Tag } from './Tag';
import { Clock, Calendar } from 'lucide-react';

interface BlogCardProps {
  post: BlogPostData;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group relative flex flex-col justify-between rounded-xl bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border p-6 hover:border-purple-200 dark:hover:border-purple-900/60 transition-all duration-300">
      <div className="space-y-4">
        {/* Meta Header */}
        <div className="flex items-center justify-between text-xs text-light-muted dark:text-dark-muted font-medium">
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            {post.date}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {post.readingTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold tracking-tight text-light-text dark:text-dark-text group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
          <Link href={`/blog/${post.slug}`} className="focus:outline-none focus:underline">
            <span className="absolute inset-0" aria-hidden="true" />
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-light-muted dark:text-dark-muted line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
      </div>

      {/* Footer Tags & Link */}
      <div className="mt-6 pt-4 border-t border-light-border/60 dark:border-dark-border/60 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <Tag key={tag} variant="subtle" size="sm">
              #{tag}
            </Tag>
          ))}
        </div>

        <span className="inline-flex items-center text-xs font-semibold text-purple-700 dark:text-purple-400">
          <span>Read</span>
        </span>
      </div>
    </article>
  );
}
