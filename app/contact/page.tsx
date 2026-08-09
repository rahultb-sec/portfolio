import React from 'react';
import type { Metadata } from 'next';
import { SectionHeader } from '@/components/SectionHeader';
import { ContactForm } from './ContactForm';
import { getSettings } from '@/lib/cms';
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Shield,
  ExternalLink,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Rahul for cybersecurity consulting, penetration testing engagements, and security research inquiries.',
};

export default function ContactPage() {
  const settings = getSettings();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <SectionHeader
        badge="Get In Touch"
        title="Contact & Collaboration"
        subtitle="Inquire about penetration testing engagements, mobile app security reviews, or security research consultations."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Info & Social Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Contact Info */}
          <div className="rounded-2xl bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border p-6 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-light-text dark:text-dark-text border-b border-light-border dark:border-dark-border pb-3">
              Direct Contact
            </h3>

            <div className="space-y-4">
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-3.5 p-3 rounded-xl bg-light-secondary/60 dark:bg-dark-secondary/60 border border-light-border dark:border-dark-border hover:border-purple-300 dark:hover:border-purple-800 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-700 dark:text-purple-300 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-medium">Email Address</span>
                  <span className="text-sm font-semibold text-light-text dark:text-dark-text group-hover:text-purple-700 dark:group-hover:text-purple-300">
                    {settings.email}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-3.5 p-3 rounded-xl bg-light-secondary/60 dark:bg-dark-secondary/60 border border-light-border dark:border-dark-border">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-700 dark:text-purple-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-medium">Location</span>
                  <span className="text-sm font-semibold text-light-text dark:text-dark-text">
                    {settings.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profiles & Platforms */}
          <div className="rounded-2xl bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border p-6 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-light-text dark:text-dark-text border-b border-light-border dark:border-dark-border pb-3">
              Social Profiles & Bug Bounty
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {settings.socials.github && (
                <a
                  href={settings.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-light-secondary/50 dark:bg-dark-secondary/50 border border-light-border dark:border-dark-border hover:border-purple-300 dark:hover:border-purple-800 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-xs font-semibold text-light-text dark:text-dark-text">GitHub</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
                </a>
              )}

              {settings.socials.linkedin && (
                <a
                  href={settings.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-light-secondary/50 dark:bg-dark-secondary/50 border border-light-border dark:border-dark-border hover:border-purple-300 dark:hover:border-purple-800 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-xs font-semibold text-light-text dark:text-dark-text">LinkedIn</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
                </a>
              )}

              {settings.socials.bugcrowd && (
                <a
                  href={settings.socials.bugcrowd}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-light-secondary/50 dark:bg-dark-secondary/50 border border-light-border dark:border-dark-border hover:border-purple-300 dark:hover:border-purple-800 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-semibold text-light-text dark:text-dark-text">Bugcrowd</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-500" />
                </a>
              )}

              {settings.socials.tryhackme && (
                <a
                  href={settings.socials.tryhackme}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-light-secondary/50 dark:bg-dark-secondary/50 border border-light-border dark:border-dark-border hover:border-purple-300 dark:hover:border-purple-800 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-semibold text-light-text dark:text-dark-text">TryHackMe</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form Component */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
