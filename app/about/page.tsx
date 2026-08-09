import React from 'react';
import type { Metadata } from 'next';
import { SectionHeader } from '@/components/SectionHeader';
import { Tag } from '@/components/Tag';
import { getAboutData, getSettings } from '@/lib/cms';
import { ShieldCheck, CheckCircle2, Award, Terminal, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Rahul T B, cybersecurity engineer, security philosophy, and technical focus areas.',
};

export default function AboutPage() {
  const about = getAboutData();
  const settings = getSettings();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <SectionHeader
        badge="About Rahul T B"
        title="Background & Security Philosophy"
        subtitle="Empirical penetration testing, vulnerability research, and defensible security architecture."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Main Bio Column */}
        <div className="lg:col-span-8 space-y-8">
          <div className="rounded-2xl bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border p-8 shadow-xs space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-light-text dark:text-dark-text tracking-tight">
              {about.heading}
            </h2>

            <div className="space-y-4 text-light-muted dark:text-dark-muted leading-relaxed">
              {about.bioParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Philosophy Banner */}
            <div className="p-5 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/50 space-y-2">
              <div className="flex items-center gap-2 text-purple-800 dark:text-purple-300 font-semibold text-sm">
                <Lock className="w-4 h-4" />
                <span>Security Philosophy</span>
              </div>
              <p className="text-sm text-purple-950 dark:text-purple-200 italic leading-relaxed">
                "{about.philosophy}"
              </p>
            </div>
          </div>

          {/* Focus Areas Grid */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-light-text dark:text-dark-text tracking-tight">
              Technical Focus Areas
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {about.focusAreas.map((area, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border p-5 space-y-2 shadow-xs hover:border-purple-200 dark:hover:border-purple-900/50 transition-colors"
                >
                  <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-semibold text-base">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>{area.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-light-muted dark:text-dark-muted leading-relaxed">
                    {area.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Stats / Info */}
          <div className="rounded-2xl bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border p-6 shadow-xs space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-light-text dark:text-dark-text border-b border-light-border dark:border-dark-border pb-3">
              Security Profile
            </h3>

            <div className="space-y-3 text-sm text-light-muted dark:text-dark-muted">
              <div>
                <span className="block text-xs text-slate-400 font-medium">Primary Role</span>
                <span className="font-medium text-light-text dark:text-dark-text">{settings.role}</span>
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-medium">Location</span>
                <span className="font-medium text-light-text dark:text-dark-text">{settings.location}</span>
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-medium">Core Certifications</span>
                <span className="font-medium text-light-text dark:text-dark-text">CISSP</span>
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-medium">Primary Focus</span>
                <span className="font-medium text-light-text dark:text-dark-text">Web & Mobile Application Pentesting</span>
              </div>
            </div>
          </div>

          {/* Technology Stack Tags */}
          <div className="rounded-2xl bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-light-text dark:text-dark-text border-b border-light-border dark:border-dark-border pb-3">
              <Terminal className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>What I Work With</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {about.technologies.map((tech) => (
                <Tag key={tech} variant="accent" size="md">
                  {tech}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
