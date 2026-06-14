'use client';

import { useEffect } from 'react';

const ACCEPTED_KEY = 'azgs-terms-accepted-v1';
const FORM_DRAFT_KEY = 'azgs-contact-draft-v1';
const RETURN_KEY = 'azgs-contact-return-v1';

const ROUTES = {
  nl: {
    contact: '/contact',
    terms: '/algemene-voorwaarden',
  },
  en: {
    contact: '/en/contact',
    terms: '/en/terms-and-conditions',
  },
} as const;

type Locale = keyof typeof ROUTES;

function getLocale(): Locale {
  return document.documentElement.lang.toLowerCase().startsWith('en')
    ? 'en'
    : 'nl';
}

function saveDraft(form: HTMLFormElement) {
  const data: Record<string, string | boolean> = {};
  const fields = form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
    'input[name], select[name], textarea[name]'
  );

  fields.forEach((field) => {
    if (field.name === 'website' || field.name === '_gotcha') return;
    if (field instanceof HTMLInputElement && field.type === 'hidden') return;
    if (field instanceof HTMLInputElement && field.type === 'checkbox') {
      data[field.name] = field.checked;
      return;
    }
    data[field.name] = field.value;
  });

  sessionStorage.setItem(FORM_DRAFT_KEY, JSON.stringify(data));
}

function restoreDraft(form: HTMLFormElement) {
  const raw = sessionStorage.getItem(FORM_DRAFT_KEY);
  if (!raw) return;

  try {
    const data = JSON.parse(raw) as Record<string, string | boolean>;
    for (const [name, value] of Object.entries(data)) {
      const field = form.elements.namedItem(name);
      if (!field) continue;
      if (field instanceof HTMLInputElement && field.type === 'checkbox') {
        field.checked = Boolean(value);
      } else if (
        field instanceof HTMLInputElement ||
        field instanceof HTMLSelectElement ||
        field instanceof HTMLTextAreaElement
      ) {
        field.value = String(value);
      }
    }
  } catch {
    sessionStorage.removeItem(FORM_DRAFT_KEY);
  }
}

export function TermsConsentScript() {
  useEffect(() => {
    const locale = getLocale();
    const routes = ROUTES[locale];
    const form = document.getElementById('contact-form') as HTMLFormElement | null;
    const termsBox = document.getElementById('terms-agree') as HTMLInputElement | null;
    const termsPanel = document.getElementById('terms-acceptance');
    const termsPageBox = document.getElementById(
      'terms-page-accept'
    ) as HTMLInputElement | null;
    const termsContinue = document.getElementById(
      'terms-continue'
    ) as HTMLAnchorElement | null;

    if (form && termsBox) {
      restoreDraft(form);
      if (localStorage.getItem(ACCEPTED_KEY) === 'true') {
        termsBox.checked = true;
      }

      const onSubmit = (event: SubmitEvent) => {
        if (!termsBox.checked) {
          event.preventDefault();
          saveDraft(form);
          sessionStorage.setItem(
            RETURN_KEY,
            `${window.location.pathname}${window.location.search}#contact-form`
          );
          window.location.href = `${routes.terms}#terms-acceptance`;
          return;
        }

        if (!form.checkValidity()) {
          event.preventDefault();
          form.reportValidity();
          return;
        }
      };

      form.addEventListener('submit', onSubmit);
      return () => form.removeEventListener('submit', onSubmit);
    }

    if (termsPanel) {
      const returnTo = sessionStorage.getItem(RETURN_KEY) || `${routes.contact}#contact-form`;

      if (termsContinue) {
        termsContinue.href = returnTo;
      }

      const setContinueState = (accepted: boolean) => {
        if (!termsContinue) return;
        termsContinue.setAttribute('aria-disabled', accepted ? 'false' : 'true');
        termsContinue.classList.toggle('is-disabled', !accepted);
        termsContinue.href = accepted ? returnTo : '#terms-acceptance';
      };

      setContinueState(localStorage.getItem(ACCEPTED_KEY) === 'true');

      if (termsPageBox) {
        termsPageBox.checked = localStorage.getItem(ACCEPTED_KEY) === 'true';
        termsPageBox.addEventListener('change', () => {
          if (termsPageBox.checked) {
            localStorage.setItem(ACCEPTED_KEY, 'true');
            setContinueState(true);
            termsContinue?.focus();
          } else {
            localStorage.removeItem(ACCEPTED_KEY);
            setContinueState(false);
          }
        });
      }

      if (window.location.hash === '#terms-acceptance') {
        requestAnimationFrame(() => {
          termsPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
      }
    }
  }, []);

  return null;
}
