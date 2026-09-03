'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Locale } from '@/lib/site';
import { trackAnalyticsEvent } from '@/lib/analytics';

type Props = {
  href: string;
  audience: 'private' | 'business' | 'maintenance';
  locale: Locale;
  className?: string;
  children: ReactNode;
};

export function AudienceChoiceLink({ href, audience, className, children }: Props) {
  const trackChoice = () => {
    trackAnalyticsEvent('audience_select', {
      audience_type: audience,
      destination_path: href,
    });
  };

  return (
    <Link href={href} className={className} onClick={trackChoice}>
      {children}
    </Link>
  );
}
