'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, ExternalLink } from 'lucide-react';
import { SiteSettings } from '@/lib/cms';

interface FooterProps {
  settings: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="text-base font-bold tracking-tight text-light-text dark:text-dark-text hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
              {settings.name}
            </Link>
            <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed max-w-md">
              {settings.role}. Dedicated to empirical vulnerability research, mobile & web application pentesting, and secure systems architecture.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-light-text dark:text-dark-text">Navigation</h4>
            <ul className="space-y-2 text-sm text-light-muted dark:text-dark-muted">
              <li><Link href="/" className="hover:text-light-accent dark:hover:text-dark-accent transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-light-accent dark:hover:text-dark-accent transition-colors">About</Link></li>
              <li><Link href="/experience" className="hover:text-light-accent dark:hover:text-dark-accent transition-colors">Experience</Link></li>
              <li><Link href="/education" className="hover:text-light-accent dark:hover:text-dark-accent transition-colors">Education</Link></li>
              <li><Link href="/projects" className="hover:text-light-accent dark:hover:text-dark-accent transition-colors">Projects</Link></li>
              <li><Link href="/certificates" className="hover:text-light-accent dark:hover:text-dark-accent transition-colors">Certificates</Link></li>
              <li><Link href="/blog" className="hover:text-light-accent dark:hover:text-dark-accent transition-colors">Blog Articles</Link></li>
              <li><Link href="/contact" className="hover:text-light-accent dark:hover:text-dark-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Social & Profiles */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-light-text dark:text-dark-text">Profiles</h4>
            <ul className="space-y-2 text-sm text-light-muted dark:text-dark-muted">
              {settings.socials.github && (
                <li>
                  <a
                    href={settings.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-light-text dark:hover:text-dark-text transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                </li>
              )}
              {settings.socials.linkedin && (
                <li>
                  <a
                    href={settings.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-light-text dark:hover:text-dark-text transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                </li>
              )}
              {settings.socials.bugcrowd && (
                <li>
                  <a
                    href={settings.socials.bugcrowd}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-light-text dark:hover:text-dark-text transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Bugcrowd</span>
                  </a>
                </li>
              )}
              {settings.socials.tryhackme && (
                <li>
                  <a
                    href={settings.socials.tryhackme}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-light-text dark:hover:text-dark-text transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>TryHackMe</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-light-border dark:border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-light-muted dark:text-dark-muted">
          <p>© {currentYear} {settings.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Security First Methodology
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
