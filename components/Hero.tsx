'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from './Button';
import { SiteSettings } from '@/lib/cms';
import { Mail, Github, Linkedin, ExternalLink, Award } from 'lucide-react';

interface HeroProps {
  settings: SiteSettings;
}

export function Hero({ settings }: HeroProps) {
  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      {/* Ambient background soft glow */}
      <div className="absolute top-1/4 right-10 -z-10 w-96 h-96 bg-purple-300/20 dark:bg-purple-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 left-10 -z-10 w-72 h-72 bg-indigo-200/20 dark:bg-indigo-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-light-text dark:text-dark-text">
                {settings.name}
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-purple-700 dark:text-purple-300 tracking-tight">
                {settings.role}
              </p>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-light-muted dark:text-dark-muted leading-relaxed max-w-2xl">
              {settings.shortBio}
            </p>

            {/* Primary CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button href="/projects" variant="primary" size="lg">
                <span>View Projects</span>
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Contact Me</span>
              </Button>
            </div>

            {/* Secondary Social & Profile Links */}
            <div className="pt-4 border-t border-light-border/70 dark:border-dark-border/70 flex flex-wrap items-center gap-4 text-xs font-medium text-light-muted dark:text-dark-muted">
              <span className="uppercase tracking-wider text-[11px] text-slate-400 dark:text-slate-500 font-semibold">Profiles:</span>
              
              {settings.socials.github && (
                <a
                  href={settings.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-light-text dark:hover:text-dark-text transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}

              {settings.socials.linkedin && (
                <a
                  href={settings.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-light-text dark:hover:text-dark-text transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              )}

              {settings.socials.bugcrowd && (
                <a
                  href={settings.socials.bugcrowd}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-light-text dark:hover:text-dark-text transition-colors"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Bugcrowd</span>
                </a>
              )}

              {settings.socials.tryhackme && (
                <a
                  href={settings.socials.tryhackme}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-light-text dark:hover:text-dark-text transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>TryHackMe</span>
                </a>
              )}
            </div>

          </div>

          {/* Right Column: Clean Transparent Avatar Display */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
            <div className="relative w-80 h-[380px] sm:w-[360px] sm:h-[450px] lg:w-[420px] lg:h-[500px] gpu-layer">
              <Image
                src="/images/Rahul.png"
                alt={`${settings.name} - Cybersecurity Professional`}
                fill
                priority
                sizes="(max-width: 768px) 320px, 420px"
                className="object-contain object-bottom transition-transform duration-500 ease-out transform-gpu"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
