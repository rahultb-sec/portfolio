'use client';

import React, { useState, useMemo } from 'react';
import { BlogPostData } from '@/lib/cms';
import { BlogCard } from '@/components/BlogCard';
import { Search, Filter, BookOpen } from 'lucide-react';

interface BlogClientProps {
  initialPosts: BlogPostData[];
}

export function BlogClient({ initialPosts }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    set.add('All');
    initialPosts.forEach((post) => {
      if (post.category) set.add(post.category);
    });
    return Array.from(set);
  }, [initialPosts]);

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query)) ||
        post.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search & Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-light-muted dark:text-dark-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, topic, or tag..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-light-secondary/60 dark:bg-dark-secondary/60 text-light-text dark:text-dark-text placeholder-light-muted dark:placeholder-dark-muted rounded-lg border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            id="blog-search-input"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <Filter className="w-4 h-4 text-light-muted dark:text-dark-muted shrink-0 hidden md:block ml-1 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-purple-700 dark:bg-purple-600 text-white shadow-xs font-semibold'
                  : 'bg-light-secondary dark:bg-dark-secondary text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text border border-light-border dark:border-dark-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 p-8 rounded-2xl bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border space-y-3">
          <BookOpen className="w-10 h-10 text-purple-600 dark:text-purple-400 mx-auto" />
          <h3 className="text-lg font-bold text-light-text dark:text-dark-text">No articles found</h3>
          <p className="text-sm text-light-muted dark:text-dark-muted max-w-md mx-auto">
            Try clearing your search query or selecting a different category to view articles.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-2 text-xs font-semibold text-purple-700 dark:text-purple-400 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
