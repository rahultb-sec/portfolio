import React from 'react';
import type { Metadata } from 'next';
import { SectionHeader } from '@/components/SectionHeader';
import { ProjectsClient } from './ProjectsClient';
import { getAllProjects } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Cybersecurity projects, open-source security tools, exploit research, and vulnerability scanners developed by Rahul.',
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <SectionHeader
        badge="Security Engineering"
        title="Projects & Research Tooling"
        subtitle="Open-source offensive security tools, vulnerability scanners, and defensive automation."
      />

      <ProjectsClient initialProjects={projects} />
    </div>
  );
}
