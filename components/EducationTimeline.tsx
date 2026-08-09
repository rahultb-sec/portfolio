'use client';

import React from 'react';
import { EducationItem } from '@/lib/cms';
import { Tag } from './Tag';
import { GraduationCap, Calendar, Award, BookOpen, ExternalLink } from 'lucide-react';

interface EducationTimelineProps {
  education: EducationItem[];
}

export function EducationTimeline({ education }: EducationTimelineProps) {
  return (
    <div className="relative border-l-2 border-purple-200 dark:border-purple-900/60 ml-4 sm:ml-6 space-y-10 py-2">
      {education.map((item) => (
        <div key={item.id} className="relative pl-6 sm:pl-8 group">
          {/* Node Icon */}
          <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-white dark:bg-dark-surface border-2 border-purple-600 dark:border-purple-400 flex items-center justify-center text-purple-700 dark:text-purple-300 shadow-xs group-hover:scale-110 transition-transform">
            <GraduationCap className="w-4 h-4" />
          </div>

          {/* Card Body */}
          <div className="rounded-xl bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border p-6 shadow-xs hover:shadow-md hover:border-purple-200 dark:hover:border-purple-900/60 transition-all duration-300 space-y-4">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-light-text dark:text-dark-text tracking-tight">
                  {item.degree} — {item.field}
                </h3>
                <div className="flex items-center gap-2 text-sm text-purple-700 dark:text-purple-300 font-semibold">
                  <span>{item.institution}</span>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline inline-flex items-center gap-0.5"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-light-muted dark:text-dark-muted font-medium shrink-0">
                <Calendar className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>{item.startDate} — {item.endDate}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed">
              {item.description}
            </p>

            {/* Relevant Coursework */}
            {item.relevantCoursework && item.relevantCoursework.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-light-border/60 dark:border-dark-border/60">
                <span className="flex items-center gap-1 text-xs font-semibold text-light-text dark:text-dark-text">
                  <BookOpen className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  Key Coursework & Specializations:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.relevantCoursework.map((course) => (
                    <Tag key={course} variant="subtle" size="sm">
                      {course}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {item.achievements && item.achievements.length > 0 && (
              <div className="p-3 rounded-lg bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/30 space-y-1">
                <span className="flex items-center gap-1 text-xs font-semibold text-purple-800 dark:text-purple-300">
                  <Award className="w-3.5 h-3.5" />
                  Honors & Accomplishments:
                </span>
                <ul className="list-disc list-inside text-xs text-light-text dark:text-dark-text space-y-0.5">
                  {item.achievements.map((ach, idx) => (
                    <li key={idx}>{ach}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>
      ))}
    </div>
  );
}
