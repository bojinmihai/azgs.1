'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/site';
import { getMessages } from '@/lib/i18n';
import { COMPANY, url } from '@/lib/site';
import {
  ANALYTICS_CONSENT_STORAGE_KEY,
  announceAnalyticsConsent,
  clearAnalyticsAttribution,
  deleteAnalyticsCookies,
  getAnalyticsConsent,
  isLocalAnalyticsPreview,
  safePageLocation,
  safePageReferrer,
  setAnalyticsCollectionDisabled,
} from '@/lib/analytics';

type Props = { locale: Locale };

export function CookieConsent({ locale }: Props) {
  const t = getMessages(locale).consent;
  const cookieHref = url('cookies', locale);
  const [visible, setVisible] = useState(false);

  const loadGA = useCallback(() => {
    if (typeof window === 'undefined') return;
    setAnalyticsCollectionDisabled(false);
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag(...args: unknown[]) {
      (window.dataLayer ||= []).push(args);
    };
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted',
    });
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    window.gtag('js', new Date());
    window.gtag('config', COMPANY.ga4, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      ads_data_redaction: true,
      page_location: safePageLocation(),
      page_referrer: safePageReferrer(),
    });
    if (isLocalAnalyticsPreview()) return;
    if (document.getElementById('ga4-script')) return;
    const script = document.createElement('script');
    script.id = 'ga4-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${COMPANY.ga4}`;
    document.head.appendChild(script);
  }, []);

  const stopGA = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }
    setAnalyticsCollectionDisabled(true);
    document.getElementById('ga4-script')?.remove();
    deleteAnalyticsCookies();
    clearAnalyticsAttribution();
  }, []);

  const accept = useCallback(() => {
    try { localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, 'accepted'); } catch { /* no-op */ }
    loadGA();
    announceAnalyticsConsent('accepted');
    setVisible(false);
  }, [loadGA]);

  const reject = useCallback(() => {
    try { localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, 'rejected'); } catch { /* no-op */ }
    stopGA();
    announceAnalyticsConsent('rejected');
    setVisible(false);
  }, [stopGA]);

  const reset = useCallback(() => {
    try { localStorage.removeItem(ANALYTICS_CONSENT_STORAGE_KEY); } catch { /* no-op */ }
    stopGA();
    announceAnalyticsConsent(null);
    setVisible(true);
  }, [stopGA]);

  useEffect(() => {
    const stored = getAnalyticsConsent();
    if (!stored) {
      stopGA();
      setVisible(true);
    } else if (stored === 'accepted') {
      loadGA();
    } else {
      stopGA();
    }

    window.azgsConsent = {
      accept,
      reject,
      reset,
      status: getAnalyticsConsent,
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
  }, [accept, loadGA, reject, reset, stopGA]);

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
            className="consent-banner__btn consent-banner__btn--choice"
            onClick={reject}
          >
            {t.reject}
          </button>
          <button
            type="button"
            className="consent-banner__btn consent-banner__btn--choice"
            onClick={accept}
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
