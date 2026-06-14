'use client';

import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/site';

type Props = { locale: Locale; altPath?: string };

const LABELS = {
  nl: { flag: '🇳🇱', code: 'NL', label: 'Nederlands' },
  en: { flag: '🇬🇧', code: 'EN', label: 'English' },
};

export function LanguageSwitcher({ locale, altPath }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LABELS[locale];
  const other: Locale = locale === 'nl' ? 'en' : 'nl';
  const otherInfo = LABELS[other];

  // altPath is the path on the OTHER locale; if not provided, fall back to home of other locale
  const otherHref = altPath ?? (other === 'nl' ? '/' : '/en');

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <div
      ref={ref}
      className="lang-switcher"
      data-lang-switcher
      data-open={open ? 'true' : 'false'}
    >
      <button
        type="button"
        className="lang-switcher__toggle"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="lang-switcher-menu"
        aria-label={locale === 'nl' ? 'Taal wijzigen / Change language' : 'Change language / Taal wijzigen'}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="lang-switcher__flag" aria-hidden="true">
          {current.flag}
        </span>
        <span className="lang-switcher__code">{current.code}</span>
        <svg
          className="lang-switcher__chevron"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <ul className="lang-switcher__menu" id="lang-switcher-menu" role="menu">
        <li role="none">
          <a
            href={otherHref}
            role="menuitem"
            hrefLang={other}
            onClick={() => {
              try {
                localStorage.setItem('azgs-lang', other);
              } catch {}
            }}
          >
            <span className="lang-switcher__flag" aria-hidden="true">
              {otherInfo.flag}
            </span>
            <span>{otherInfo.label}</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
