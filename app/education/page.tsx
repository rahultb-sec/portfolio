import React from 'react';
import type { Metadata } from 'next';
import { SectionHeader } from '@/components/SectionHeader';
import { EducationTimeline } from '@/components/EducationTimeline';
import { getEducation } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Education',
  description: 'Academic background, degree programs, computer science foundation, and coursework of Rahul T B.',
};

export default function EducationPage() {
  const education = getEducation();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <SectionHeader
        badge="Academic Background"
        title="Education & Academic Training"
        subtitle="Foundational computer science, cryptography, and network engineering qualifications."
      />

      <EducationTimeline education={education} />
    </div>
  );
}
