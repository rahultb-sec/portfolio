'use client';

import React from 'react';
import { ExperienceItem } from '@/lib/cms';
import { Tag } from './Tag';
import { Briefcase, Calendar, MapPin, ExternalLink, CheckCircle2 } from 'lucide-react';

interface ExperienceTimelineProps {
  experiences: ExperienceItem[];
  compact?: boolean;
}

export function ExperienceTimeline({ experiences, compact = false }: ExperienceTimelineProps) {
  const items = compact ? experiences.slice(0, 2) : experiences;

  return (
    <div className="relative border-l-2 border-purple-200 dark:border-purple-900/60 ml-4 sm:ml-6 space-y-10 py-2">
      {items.map((item) => (
        <div key={item.id} className="relative pl-6 sm:pl-8 group">
          {/* Node Icon */}
          <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-white dark:bg-dark-surface border-2 border-purple-600 dark:border-purple-400 flex items-center justify-center text-purple-700 dark:text-purple-300 shadow-xs group-hover:scale-110 transition-transform">
            <Briefcase className="w-3.5 h-3.5" />
          </div>

          {/* Card Body */}
          <div className="rounded-xl bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border p-6 shadow-xs hover:shadow-md hover:border-purple-200 dark:hover:border-purple-900/60 transition-all duration-300 space-y-4">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-light-text dark:text-dark-text tracking-tight">
                  {item.position}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-sm text-purple-700 dark:text-purple-300 font-semibold">
                  <span>{item.organization}</span>
                  {item.externalLink && (
                    <a
                      href={item.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline inline-flex items-center gap-0.5"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-light-muted dark:text-dark-muted font-medium shrink-0">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  {item.startDate} — {item.endDate}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {item.location}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed">
              {item.description}
            </p>

            {/* Responsibilities list */}
            {item.responsibilities && item.responsibilities.length > 0 && (
              <ul className="space-y-1.5 text-xs sm:text-sm text-light-text dark:text-dark-text">
                {item.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{resp}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Achievements */}
            {item.achievements && item.achievements.length > 0 && (
              <div className="p-3 rounded-lg bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/30 space-y-1">
                <span className="text-xs font-semibold text-purple-800 dark:text-purple-300 uppercase tracking-wider">Key Impact:</span>
                <ul className="list-disc list-inside text-xs text-light-text dark:text-dark-text space-y-0.5">
                  {item.achievements.map((ach, idx) => (
                    <li key={idx}>{ach}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Tags */}
            {item.technologies && item.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-light-border/60 dark:border-dark-border/60">
                {item.technologies.map((tech) => (
                  <Tag key={tech} variant="subtle" size="sm">
                    {tech}
                  </Tag>
                ))}
              </div>
            )}

          </div>
        </div>
      ))}
    </div>
  );
}
