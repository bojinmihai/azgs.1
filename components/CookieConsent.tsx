'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/site';
import { getMessages } from '@/lib/i18n';
import { COMPANY, url } from '@/lib/site';

const STORAGE_KEY = 'azgs-consent-v1';

type Props = { locale: Locale };

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    azgsConsent?: {
      accept: () => void;
      reject: () => void;
      reset: () => void;
      status: () => string | null;
    };
  }
}

export function CookieConsent({ locale }: Props) {
  const t = getMessages(locale).consent;
  const cookieHref = url('cookies', locale);
  const [visible, setVisible] = useState(false);

  const loadGA = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (document.getElementById('ga4-script')) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', COMPANY.ga4, { anonymize_ip: true });
    const script = document.createElement('script');
    script.id = 'ga4-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${COMPANY.ga4}`;
    document.head.appendChild(script);
  }, []);

  const accept = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    loadGA();
    setVisible(false);
  }, [loadGA]);

  const reject = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'rejected');
    setVisible(false);
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setVisible(true);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    } else if (stored === 'accepted') {
      loadGA();
    }

    window.azgsConsent = {
      accept,
      reject,
      reset,
      status: () => localStorage.getItem(STORAGE_KEY),
    };

    const onConsentAction = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const button = target.closest<HTMLElement>('[data-consent-action]');
      if (!button) return;
      const action = button.dataset.consentAction;
      if (action === 'accept') accept();
      if (action === 'reject') reject();
      if (action === 'reset') reset();
    };

    document.addEventListener('click', onConsentAction);
    return () => {
      document.removeEventListener('click', onConsentAction);
      delete window.azgsConsent;
    };
  }, [accept, loadGA, reject, reset]);

  if (!visible) return null;

  // Split text on <a>...</a> placeholder for the cookie policy link
  const parts = t.text.split(/<a>(.+?)<\/a>/);

  return (
    <div
      className="consent-banner"
      data-consent-banner
      role="dialog"
      aria-live="polite"
      aria-labelledby="consent-banner-title"
      aria-describedby="consent-banner-text"
    >
      <div className="consent-banner__inner">
        <div className="consent-banner__content">
          <h2 id="consent-banner-title" className="consent-banner__title">
            {t.title}
          </h2>
          <p id="consent-banner-text" className="consent-banner__text">
            {parts[0]}
            {parts[1] && <Link href={cookieHref}>{parts[1]}</Link>}
            {parts[2]}
          </p>
        </div>
        <div className="consent-banner__actions">
          <button
            type="button"
            className="consent-banner__btn consent-banner__btn--ghost"
            onClick={reject}
          >
            {t.reject}
          </button>
          <button
            type="button"
            className="consent-banner__btn consent-banner__btn--primary"
            onClick={accept}
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
