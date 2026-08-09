'use client';

import React from 'react';
import Link from 'next/link';
import { ProjectData } from '@/lib/cms';
import { Tag } from './Tag';
import { ExternalLink, Github, Shield } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectData;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative flex flex-col justify-between rounded-xl bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border p-6 hover:border-purple-200 dark:hover:border-purple-900/60 transition-all duration-300">
      <div className="space-y-4">
        {/* Category & Security Tag */}
        <div className="flex items-center justify-between gap-2">
          <Tag variant="accent" size="sm">
            {project.category}
          </Tag>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
            <Shield className="w-3 h-3 text-purple-600 dark:text-purple-400" />
            {project.securityType}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-light-text dark:text-dark-text group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
          <Link href={`/projects/${project.slug}`} className="focus:outline-none focus:underline">
            <span className="absolute inset-0" aria-hidden="true" />
            {project.title}
          </Link>
        </h3>

        {/* Short Description */}
        <p className="text-sm text-light-muted dark:text-dark-muted line-clamp-3 leading-relaxed">
          {project.shortDescription}
        </p>
      </div>

      {/* Tech Tags & Links Footer */}
      <div className="mt-6 pt-4 border-t border-light-border/60 dark:border-dark-border/60 flex flex-col gap-3">
        {/* Technologies List */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <Tag key={tech} variant="subtle" size="sm">
              {tech}
            </Tag>
          ))}
          {project.technologies.length > 4 && (
            <Tag variant="subtle" size="sm">
              +{project.technologies.length - 4}
            </Tag>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center justify-between pt-1 z-10">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center text-xs font-semibold text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300 transition-colors"
          >
            <span>View Case Study</span>
          </Link>

          <div className="flex items-center gap-2 text-light-muted dark:text-dark-muted">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:text-light-text dark:hover:text-dark-text transition-colors"
                title="View Source on GitHub"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.documentationUrl && (
              <a
                href={project.documentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:text-light-text dark:hover:text-dark-text transition-colors"
                title="Documentation"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
