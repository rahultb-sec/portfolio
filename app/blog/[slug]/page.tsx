import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

import { getBlogPostBySlug, getAllBlogPosts, getSettings } from '@/lib/cms';
import { Tag } from '@/components/Tag';
import { ArrowLeft, Calendar, Clock, User, ShieldCheck } from 'lucide-react';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${post.title} | Security Writeup`,
    description: post.excerpt,
  };
}

export default function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);
  const settings = getSettings();

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Back Link */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-light-muted dark:text-dark-muted hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          id="back-to-blog-link"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>
      </div>

      {/* Article Header Card */}
      <header className="rounded-2xl bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-light-muted dark:text-dark-muted font-medium border-b border-light-border/60 dark:border-dark-border/60 pb-4">
          <Tag variant="accent" size="sm">
            {post.category}
          </Tag>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {post.readingTime}
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-light-text dark:text-dark-text leading-tight">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="text-base sm:text-lg text-light-muted dark:text-dark-muted leading-relaxed">
          {post.excerpt}
        </p>

        {/* Meta Author & Tags */}
        <div className="pt-4 border-t border-light-border/60 dark:border-dark-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-medium text-light-text dark:text-dark-text">
            <div className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-700 dark:text-purple-300">
              <User className="w-4 h-4" />
            </div>
            <span>Written by <strong className="font-semibold">{post.author || settings.name}</strong></span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Tag key={tag} variant="subtle" size="sm">
                #{tag}
              </Tag>
            ))}
          </div>
        </div>
      </header>

      {/* Main Markdown Article Content */}
      <article className="rounded-2xl bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border p-6 sm:p-10 shadow-xs">
        <div className="prose prose-purple dark:prose-invert max-w-none text-light-text dark:text-dark-text leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* Author Bio Box Footer */}
      <footer className="rounded-2xl bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/50 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="space-y-1 flex-1">
          <h4 className="text-sm font-bold text-light-text dark:text-dark-text">
            About {settings.name}
          </h4>
          <p className="text-xs text-light-muted dark:text-dark-muted leading-relaxed">
            {settings.shortBio} Specialized in application penetration testing, offensive security research, and vulnerability discovery.
          </p>
        </div>
      </footer>

      {/* Bottom Navigation */}
      <div className="pt-6 border-t border-light-border dark:border-dark-border flex justify-between items-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-purple-700 dark:text-purple-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog Articles</span>
        </Link>
      </div>
    </div>
  );
}
