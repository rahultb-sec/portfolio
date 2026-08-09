import React from 'react';
import type { Metadata } from 'next';
import { SectionHeader } from '@/components/SectionHeader';
import { CertificateCard } from '@/components/CertificateCard';
import { getCertificates } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Certificates',
  description: 'Verified professional cybersecurity certifications and specialized accreditations held by Rahul T B.',
};

export default function CertificatesPage() {
  const certificates = getCertificates();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <SectionHeader
        badge="Verified Qualifications"
        title="Certifications & Accreditations"
        subtitle="Industry-recognized practical security certifications validating offensive, defensive, and architectural domain expertise."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <CertificateCard key={cert.id} certificate={cert} />
        ))}
      </div>
    </div>
  );
}
