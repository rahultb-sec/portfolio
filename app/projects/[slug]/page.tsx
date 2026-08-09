import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

import { getProjectBySlug, getAllProjects } from '@/lib/cms';
import { Tag } from '@/components/Tag';
import {
  ArrowLeft,
  Calendar,
  Shield,
  Github,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Security Case Study`,
    description: project.shortDescription,
  };
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Back Link */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-light-muted dark:text-dark-muted hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          id="back-to-projects-link"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </Link>
      </div>

      {/* Article Header Card */}
      <header className="rounded-2xl bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-light-muted dark:text-dark-muted font-medium border-b border-light-border/60 dark:border-dark-border/60 pb-4">
          <div className="flex items-center gap-2">
            <Tag variant="accent" size="sm">
              {project.category}
            </Tag>
            <span className="inline-flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              {project.securityType}
            </span>
          </div>

          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {project.date}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-light-text dark:text-dark-text leading-tight">
          {project.title}
        </h1>

        {/* Short Description */}
        <p className="text-base sm:text-lg text-light-muted dark:text-dark-muted leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Technologies & External Links */}
        <div className="pt-4 border-t border-light-border/60 dark:border-dark-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <Tag key={tech} variant="subtle" size="md">
                {tech}
              </Tag>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-dark-text hover:bg-purple-100 dark:hover:bg-purple-950/60 border border-light-border dark:border-dark-border transition-colors"
              >
                <Github className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>GitHub Repository</span>
              </a>
            )}
            {project.documentationUrl && (
              <a
                href={project.documentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-700 dark:bg-purple-600 text-white hover:bg-purple-800 dark:hover:bg-purple-500 shadow-xs transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>Docs</span>
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Markdown Body */}
      <article className="rounded-2xl bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border p-6 sm:p-10 shadow-xs">
        <div className="prose prose-purple dark:prose-invert max-w-none text-light-text dark:text-dark-text leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {project.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* Bottom Navigation */}
      <div className="pt-6 border-t border-light-border dark:border-dark-border flex justify-between items-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-purple-700 dark:text-purple-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore All Security Projects</span>
        </Link>
      </div>
    </div>
  );
}
