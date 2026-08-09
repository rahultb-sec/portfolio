'use client';

import React from 'react';
import Image from 'next/image';
import { CertificateItem } from '@/lib/cms';
import { Tag } from './Tag';
import { Award, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';

interface CertificateCardProps {
  certificate: CertificateItem;
}

export function CertificateCard({ certificate }: CertificateCardProps) {
  return (
    <div className="group flex flex-col sm:flex-row gap-5 rounded-xl bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border p-6 hover:border-purple-200 dark:hover:border-purple-900/60 transition-all duration-300">
      {/* Certificate Thumbnail / Badge Icon */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl bg-purple-100/70 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/50 flex items-center justify-center overflow-hidden">
        {certificate.image ? (
          <Image
            src={certificate.image}
            alt={certificate.name}
            fill
            sizes="80px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <Award className="w-8 h-8 text-purple-700 dark:text-purple-300" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4">
          <div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-700 dark:text-purple-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {certificate.issuer}
            </span>
            <h3 className="text-lg font-bold text-light-text dark:text-dark-text tracking-tight">
              {certificate.name}
            </h3>
          </div>

          <div className="flex items-center gap-3 text-xs text-light-muted dark:text-dark-muted shrink-0">
            <span className="inline-flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              {certificate.issueDate}
            </span>
            {certificate.credentialUrl && (
              <a
                href={certificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300 transition-colors"
                title="Verify Credential"
              >
                <span>Verify</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed">
          {certificate.description}
        </p>

        {/* Credential ID */}
        {certificate.credentialId && (
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
            ID: <span className="text-light-text dark:text-dark-text">{certificate.credentialId}</span>
          </p>
        )}

        {/* Skills / Topics */}
        {certificate.skills && certificate.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {certificate.skills.map((skill) => (
              <Tag key={skill} variant="subtle" size="sm">
                {skill}
              </Tag>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
