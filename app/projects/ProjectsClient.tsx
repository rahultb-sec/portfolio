'use client';

import React, { useState, useMemo } from 'react';
import { ProjectData } from '@/lib/cms';
import { ProjectCard } from '@/components/ProjectCard';
import { Search, Filter, ShieldAlert } from 'lucide-react';

interface ProjectsClientProps {
  initialProjects: ProjectData[];
}

export function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    set.add('All');
    initialProjects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [initialProjects]);

  // Filter projects based on category and search query
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.shortDescription.toLowerCase().includes(query) ||
        project.technologies.some((t) => t.toLowerCase().includes(query)) ||
        project.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [initialProjects, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search and Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border shadow-xs">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-light-muted dark:text-dark-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by title, tech stack, or keyword..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-light-secondary/60 dark:bg-dark-secondary/60 text-light-text dark:text-dark-text placeholder-light-muted dark:placeholder-dark-muted rounded-lg border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            id="projects-search-input"
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

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 p-8 rounded-2xl bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border space-y-3">
          <ShieldAlert className="w-10 h-10 text-purple-600 dark:text-purple-400 mx-auto" />
          <h3 className="text-lg font-bold text-light-text dark:text-dark-text">No matching projects found</h3>
          <p className="text-sm text-light-muted dark:text-dark-muted max-w-md mx-auto">
            Try adjusting your search terms or filter selection to find relevant security engineering research.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-2 text-xs font-semibold text-purple-700 dark:text-purple-400 hover:underline"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
