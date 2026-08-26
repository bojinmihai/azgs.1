'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Locale } from '@/lib/site';

type Props = {
  href: string;
  audience: 'private' | 'business' | 'maintenance';
  locale: Locale;
  className?: string;
  children: ReactNode;
};

type WindowWithGtag = Window & {
  gtag?: (...args: unknown[]) => void;
};

export function AudienceChoiceLink({ href, audience, locale, className, children }: Props) {
  const trackChoice = () => {
    const browserWindow = window as WindowWithGtag;
    if (typeof browserWindow.gtag !== 'function') return;

    browserWindow.gtag('event', 'audience_select', {
      audience_type: audience,
      language: locale,
      destination_path: href,
    });
  };

  return (
    <Link href={href} className={className} onClick={trackChoice}>
      {children}
    </Link>
  );
}
