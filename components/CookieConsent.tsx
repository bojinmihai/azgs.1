'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/site';
import { getMessages } from '@/lib/i18n';
import { COMPANY, url } from '@/lib/site';
import {
  ANALYTICS_CONSENT_STORAGE_KEY,
  type AnalyticsConsentStatus,
  announceAnalyticsConsent,
  clearAnalyticsAttribution,
  deleteAnalyticsCookies,
  getAnalyticsConsent,
  isProductionAnalyticsHost,
  safePageLocation,
  safePageReferrer,
  setAnalyticsCollectionDisabled,
} from '@/lib/analytics';

type Props = { locale: Locale };

export function CookieConsent({ locale }: Props) {
  const t = getMessages(locale).consent;
  const cookieHref = url('cookies', locale);
  const [visible, setVisible] = useState(false);
  const [consentStatus, setConsentStatus] = useState<AnalyticsConsentStatus>(null);
  const firstChoiceRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const loadGA = useCallback(() => {
    if (typeof window === 'undefined') return;
    setAnalyticsCollectionDisabled(false);
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
      // gtag.js consumes command arguments objects, not ordinary arrays.
      // eslint-disable-next-line prefer-rest-params -- Google's command queue requires Arguments.
      (window.dataLayer ||= []).push(arguments);
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
      send_page_view: false,
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      ads_data_redaction: true,
      page_location: safePageLocation(),
      page_referrer: safePageReferrer(),
    });
    if (!isProductionAnalyticsHost()) return;
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

  const close = useCallback(() => {
    setVisible(false);
    const opener = openerRef.current;
    openerRef.current = null;
    if (opener) {
      window.requestAnimationFrame(() => {
        if (document.contains(opener)) opener.focus();
      });
    }
  }, []);

  const accept = useCallback(() => {
    try { localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, 'accepted'); } catch { /* no-op */ }
    setConsentStatus('accepted');
    loadGA();
    announceAnalyticsConsent('accepted');
    close();
  }, [close, loadGA]);

  const reject = useCallback(() => {
    try { localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, 'rejected'); } catch { /* no-op */ }
    setConsentStatus('rejected');
    stopGA();
    announceAnalyticsConsent('rejected');
    close();
  }, [close, stopGA]);

  const open = useCallback((trigger?: HTMLElement) => {
    const activeElement = document.activeElement;
    openerRef.current = trigger || (activeElement instanceof HTMLElement ? activeElement : null);
    setConsentStatus(getAnalyticsConsent());
    setVisible(true);
    window.requestAnimationFrame(() => firstChoiceRef.current?.focus());
  }, []);

  const reset = useCallback((trigger?: HTMLElement) => {
    try { localStorage.removeItem(ANALYTICS_CONSENT_STORAGE_KEY); } catch { /* no-op */ }
    setConsentStatus(null);
    stopGA();
    announceAnalyticsConsent(null);
    open(trigger);
  }, [open, stopGA]);

  useEffect(() => {
    const stored = getAnalyticsConsent();
    setConsentStatus(stored);
    if (!stored) {
      stopGA();
      setVisible(true);
    } else if (stored === 'accepted') {
      loadGA();
      announceAnalyticsConsent('accepted');
    } else {
      stopGA();
    }

    window.azgsConsent = {
      accept,
      reject,
      open,
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
      if (action === 'open') open(button);
      if (action === 'reset') reset(button);
    };

    document.addEventListener('click', onConsentAction);
    return () => {
      document.removeEventListener('click', onConsentAction);
      delete window.azgsConsent;
    };
  }, [accept, loadGA, open, reject, reset, stopGA]);

  useEffect(() => {
    if (!visible || !consentStatus) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      close();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [close, consentStatus, visible]);

  // Split text on <a>...</a> placeholder for the cookie policy link
  const parts = t.text.split(/<a>(.+?)<\/a>/);

  return (
    <div
      id="azgs-consent-banner"
      className="consent-banner"
      data-consent-banner
      hidden={!visible}
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
          {consentStatus ? (
            <p className="consent-banner__status" role="status">
              {t.currentStatus.replace(
                '{choice}',
                consentStatus === 'accepted' ? t.statusAccepted : t.statusRejected,
              )}
            </p>
          ) : null}
        </div>
        <div className="consent-banner__actions">
          <button
            ref={firstChoiceRef}
            type="button"
            className="consent-banner__btn consent-banner__btn--choice"
            onClick={reject}
            aria-pressed={consentStatus === 'rejected'}
          >
            {t.reject}
          </button>
          <button
            type="button"
            className="consent-banner__btn consent-banner__btn--choice"
            onClick={accept}
            aria-pressed={consentStatus === 'accepted'}
          >
            {t.accept}
          </button>
          {consentStatus ? (
            <button
              type="button"
              className="consent-banner__btn consent-banner__btn--ghost"
              onClick={close}
            >
              {t.close}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
