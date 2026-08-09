import React from 'react';
import type { Metadata } from 'next';
import { SectionHeader } from '@/components/SectionHeader';
import { BlogClient } from './BlogClient';
import { getAllBlogPosts } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Offensive security research, deep dives into vulnerability mechanics, Active Directory exploitation, and web application security writeups by Rahul.',
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <SectionHeader
        badge="Technical Publications"
        title="Offensive Security & Vulnerability Research Blog"
        subtitle="In-depth analysis of exploitation techniques, root cause analysis, and defensive remediations."
      />

      <BlogClient initialPosts={posts} />
    </div>
  );
}
