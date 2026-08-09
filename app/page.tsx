import React from 'react';
import { Hero } from '@/components/Hero';
import { SectionHeader } from '@/components/SectionHeader';
import { ProjectCard } from '@/components/ProjectCard';
import { BlogCard } from '@/components/BlogCard';
import { CertificateCard } from '@/components/CertificateCard';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';
import { Tag } from '@/components/Tag';
import {
  getSettings,
  getAboutData,
  getFeaturedProjects,
  getFeaturedBlogPosts,
  getCertificates,
  getExperience,
} from '@/lib/cms';
import { ShieldCheck } from 'lucide-react';

export default function HomePage() {
  const settings = getSettings();
  const about = getAboutData();
  const projects = getFeaturedProjects().slice(0, 3);
  const posts = getFeaturedBlogPosts().slice(0, 3);
  const certificates = getCertificates().slice(0, 2);
  const experiences = getExperience();

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Component */}
      <Hero settings={settings} />

      {/* 1. About Preview Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border p-8 sm:p-10 space-y-6">
          <SectionHeader
            badge="About & Philosophy"
            title="Adversarial Mindset, Empirical Analysis"
            subtitle="I evaluate systems from an attacker's perspective to build defensible architectures."
            linkHref="/about"
            linkText="Read Full Bio & Methodology"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4 text-light-muted dark:text-dark-muted leading-relaxed text-sm sm:text-base">
              {about.bioParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="lg:col-span-5 space-y-4 p-5 rounded-xl bg-light-secondary/60 dark:bg-dark-secondary/60 border border-light-border dark:border-dark-border">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-light-text dark:text-dark-text">
                Primary Security Focus:
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-light-text dark:text-dark-text">
                {about.focusAreas.map((area, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">{area.title}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* What I Work With */}
          <div className="pt-6 border-t border-light-border/60 dark:border-dark-border/60 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-light-muted dark:text-dark-muted">
              What I Work With
            </h4>
            <div className="flex flex-wrap gap-2">
              {about.technologies.map((tech) => (
                <Tag key={tech} variant="accent" size="md">
                  {tech}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Experience Preview Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Career History"
          title="Professional Experience"
          subtitle="Recent cybersecurity positions and penetration testing engagements."
          linkHref="/experience"
          linkText="View Full Career Timeline"
        />
        <ExperienceTimeline experiences={experiences} compact={true} />
      </section>

      {/* 3. Selected Projects Preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Security Engineering & Research"
          title="Featured Projects"
          subtitle="Open-source tooling, vulnerability research, and security frameworks."
          linkHref="/projects"
          linkText="View All Projects"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* 4. Latest Blog Articles Preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Technical Writing"
          title="Latest Blog Posts"
          subtitle="Deep-dives into vulnerability mechanics, reverse engineering, and offensive security."
          linkHref="/blog"
          linkText="View All Articles"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* 5. Certificates Preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Verified Qualifications"
          title="Certifications & Accreditations"
          subtitle="Industry-standard practical security certifications."
          linkHref="/certificates"
          linkText="View All Certificates"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <CertificateCard key={cert.id} certificate={cert} />
          ))}
        </div>
      </section>
    </div>
  );
}
