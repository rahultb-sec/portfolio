import React from 'react';
import type { Metadata } from 'next';
import { SectionHeader } from '@/components/SectionHeader';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';
import { getExperience } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Professional experience, roles, responsibilities, and key security impact achievements of Rahul.',
};

export default function ExperiencePage() {
  const experiences = getExperience();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <SectionHeader
        badge="Career History"
        title="Experience & Professional Roles"
        subtitle="Penetration testing engagements, application security leadership, and vulnerability research roles."
      />

      <ExperienceTimeline experiences={experiences} compact={false} />
    </div>
  );
}
