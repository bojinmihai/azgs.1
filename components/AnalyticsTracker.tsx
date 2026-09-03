'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import type { BusinessSectorKey } from '@/lib/business-sectors';
import {
  ANALYTICS_CONSENT_EVENT,
  type RequestType,
  type ServiceContext,
  primeSafeAnalyticsContext,
  rememberCtaOrigin,
  trackAnalyticsEvent,
  trackAnalyticsPageView,
} from '@/lib/analytics';

const REQUEST_TYPES = new Set<RequestType>(['private', 'business', 'maintenance', 'emergency']);
const SERVICES = new Set<ServiceContext>([
  'plumbing',
  'heating',
  'underfloor-heating',
  'ventilation-climate',
  'electrical',
  'drywall',
  'painting',
  'tiling',
  'parquet',
  'multiple',
  'other',
  'emergency',
  'none',
]);
const BUSINESS_SECTORS = new Set<BusinessSectorKey>([
  'contractors',
  'property-managers',
  'hospitality-hotels',
  'offices-retail',
  'owners-associations',
  'installation-ventilation',
]);

function formContext(form: HTMLFormElement | null) {
  const rawType = form?.querySelector<HTMLInputElement>('input[name="request_type"]:checked')?.value || '';
  const rawService = form?.querySelector<HTMLSelectElement>('select[name="service"]')?.value || '';
  const rawBusinessSector = form?.querySelector<HTMLInputElement>('input[name="business_sector"]')?.value || '';
  return {
    requestType: REQUEST_TYPES.has(rawType as RequestType) ? rawType as RequestType : undefined,
    service: SERVICES.has(rawService as ServiceContext) ? rawService as ServiceContext : undefined,
    businessSector: BUSINESS_SECTORS.has(rawBusinessSector as BusinessSectorKey) ? rawBusinessSector as BusinessSectorKey : undefined,
  };
}

function contactLocation(anchor: HTMLAnchorElement) {
  if (anchor.closest('.site-header')) return 'header' as const;
  if (anchor.closest('.site-footer')) return 'footer' as const;
  if (anchor.closest('.whatsapp-float')) return 'floating' as const;
  if (anchor.closest('.contact-info')) return 'contact_sidebar' as const;
  if (anchor.closest('.form-emergency-call')) return 'emergency_form' as const;
  if (anchor.closest('.hero')) return 'hero' as const;
  return 'content' as const;
}

function documentEvent(anchor: HTMLAnchorElement) {
  const type = anchor.dataset.documentType;
  if (!type) return false;
  const audience = anchor.dataset.audience;
  if (audience !== 'b2c' && audience !== 'b2b') return false;
  const documentAudience: 'b2c' | 'b2b' = audience;
  const language = anchor.dataset.documentLanguage;
  const version = anchor.dataset.documentVersion;
  const documentType: 'terms' | 'capabilities' | 'other' = type === 'terms' || type === 'capabilities' ? type : 'other';
  const common = {
    document_type: documentType,
    document_audience: documentAudience,
    document_language: language === 'en' ? 'en' as const : 'nl' as const,
    document_version: version || '',
  };
  if (type === 'terms') trackAnalyticsEvent('legal_document_download', common);
  else if (type === 'capabilities' && audience === 'b2b') trackAnalyticsEvent('b2b_document_download', common);
  else return false;
  return true;
}

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    primeSafeAnalyticsContext();
    const sendPageView = () => trackAnalyticsPageView(pathname);
    const timer = window.setTimeout(sendPageView, 0);
    const onConsent = (event: Event) => {
      const status = (event as CustomEvent).detail?.status;
      if (status === 'accepted') sendPageView();
    };
    window.addEventListener(ANALYTICS_CONSENT_EVENT, onConsent);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(ANALYTICS_CONSENT_EVENT, onConsent);
    };
  }, [pathname]);

  useEffect(() => {
    const form = document.querySelector<HTMLFormElement>('#contact-form');
    let formStarted = false;
    let formCompleted = false;
    let abandonSent = false;

    const startForm = (target: EventTarget | null) => {
      if (!form || !(target instanceof HTMLElement) || !form.contains(target)) return;
      if (target.closest('[aria-hidden="true"]') || target.matches('input[type="hidden"], button, a')) return;
      if (form.dataset.analyticsStarted === 'true') {
        formStarted = true;
        return;
      }
      const context = formContext(form);
      if (trackAnalyticsEvent('contact_form_start', {
        request_type: context.requestType,
        service_context: context.service,
        business_sector: context.businessSector,
        form_variant: 'adaptive-contact-v3',
      })) {
        formStarted = true;
        form.dataset.analyticsStarted = 'true';
      }
    };

    const onInput = (event: Event) => startForm(event.target);
    const onChange = (event: Event) => {
      startForm(event.target);
      const target = event.target;
      const context = formContext(form);
      if (target instanceof HTMLInputElement && target.name === 'request_type' && REQUEST_TYPES.has(target.value as RequestType)) {
        trackAnalyticsEvent('request_type_select', {
          request_type: target.value as RequestType,
          service_context: context.service,
        });
      }
      if (target instanceof HTMLSelectElement && target.name === 'service' && SERVICES.has(target.value as ServiceContext)) {
        trackAnalyticsEvent('service_select', {
          request_type: context.requestType,
          service_context: target.value as ServiceContext,
          business_sector: context.businessSector,
        });
      }
    };

    const sendAbandon = () => {
      if (!formStarted && form?.dataset.analyticsStarted !== 'true') return;
      if (formCompleted || form?.dataset.analyticsCompleted === 'true' || abandonSent || form?.dataset.analyticsAbandonSent === 'true') return;
      const context = formContext(form);
      if (trackAnalyticsEvent('contact_form_abandon', {
        request_type: context.requestType,
        service_context: context.service,
        business_sector: context.businessSector,
        form_variant: 'adaptive-contact-v3',
        transport_type: 'beacon',
      })) {
        abandonSent = true;
        if (form) form.dataset.analyticsAbandonSent = 'true';
      }
    };

    const onFormSuccess = (event: Event) => {
      formCompleted = true;
      if (form) form.dataset.analyticsCompleted = 'true';
      const detail = (event as CustomEvent).detail as { requestType?: unknown; service?: unknown; businessSector?: unknown } | undefined;
      const requestType = typeof detail?.requestType === 'string' && REQUEST_TYPES.has(detail.requestType as RequestType)
        ? detail.requestType as RequestType
        : undefined;
      const service = typeof detail?.service === 'string' && SERVICES.has(detail.service as ServiceContext)
        ? detail.service as ServiceContext
        : undefined;
      const businessSector = typeof detail?.businessSector === 'string' && BUSINESS_SECTORS.has(detail.businessSector as BusinessSectorKey)
        ? detail.businessSector as BusinessSectorKey
        : undefined;
      trackAnalyticsEvent('generate_lead', {
        request_type: requestType,
        service_context: service,
        business_sector: businessSector,
        form_variant: 'adaptive-contact-v3',
      });
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>('a[href]');
      if (!anchor) return;

      documentEvent(anchor);
      const rawHref = anchor.getAttribute('href') || '';
      const location = contactLocation(anchor);
      const selectedService = formContext(form).service;
      let isContactConversion = false;

      if (rawHref.startsWith('tel:')) {
        trackAnalyticsEvent('phone_click', { contact_location: location, service_context: selectedService });
        isContactConversion = true;
      } else if (rawHref.startsWith('mailto:')) {
        const address = rawHref.slice(7).split('?')[0].toLowerCase();
        const emailKind = address === 'aanvragen@azgs.nl' ? 'requests' : address === 'info@azgs.nl' ? 'general' : 'other';
        trackAnalyticsEvent('email_click', { contact_location: location, email_kind: emailKind, service_context: selectedService });
        isContactConversion = true;
      } else {
        try {
          const destination = new URL(rawHref, window.location.href);
          if (destination.hostname === 'wa.me' || destination.hostname.endsWith('.whatsapp.com')) {
            trackAnalyticsEvent('whatsapp_click', { contact_location: location, service_context: selectedService });
            isContactConversion = true;
          } else if (destination.origin === window.location.origin && destination.pathname !== window.location.pathname) {
            if (destination.pathname === '/contact' || destination.pathname === '/en/contact') {
              rememberCtaOrigin();
            }
            sendAbandon();
          }
        } catch {
          // Invalid links are handled by the browser and are not measured.
        }
      }

      if (isContactConversion && (formStarted || form?.dataset.analyticsStarted === 'true')) {
        formCompleted = true;
        if (form) form.dataset.analyticsCompleted = 'true';
      }
    };

    const onPageHide = (event: PageTransitionEvent) => {
      if (!event.persisted) sendAbandon();
    };

    document.addEventListener('input', onInput);
    document.addEventListener('change', onChange);
    document.addEventListener('click', onClick, true);
    window.addEventListener('pagehide', onPageHide);
    window.addEventListener('azgs:form-success', onFormSuccess);

    return () => {
      document.removeEventListener('input', onInput);
      document.removeEventListener('change', onChange);
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('pagehide', onPageHide);
      window.removeEventListener('azgs:form-success', onFormSuccess);
    };
  }, [pathname]);

  return null;
}
