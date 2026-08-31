'use client';

import { useEffect } from 'react';

const ACCEPTED_KEY = 'azgs-terms-accepted-v1';
const RETURN_KEY = 'azgs-contact-return-v1';

const CONTACT_ROUTES = {
  nl: '/contact#contact-form',
  en: '/en/contact#contact-form',
} as const;

export function TermsConsentScript() {
  useEffect(() => {
    const termsPanel = document.getElementById('terms-acceptance');
    if (!termsPanel) return;

    const locale = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'nl';
    const checkbox = document.getElementById('terms-page-accept') as HTMLInputElement | null;
    const continueLink = document.getElementById('terms-continue') as HTMLAnchorElement | null;
    const returnTo = sessionStorage.getItem(RETURN_KEY) || CONTACT_ROUTES[locale];

    const updateContinueLink = (accepted: boolean) => {
      if (!continueLink) return;
      continueLink.setAttribute('aria-disabled', accepted ? 'false' : 'true');
      continueLink.classList.toggle('is-disabled', !accepted);
      continueLink.href = accepted ? returnTo : '#terms-acceptance';
    };

    const accepted = localStorage.getItem(ACCEPTED_KEY) === 'true';
    if (checkbox) checkbox.checked = accepted;
    updateContinueLink(accepted);

    const onChange = () => {
      const isAccepted = Boolean(checkbox?.checked);
      if (isAccepted) localStorage.setItem(ACCEPTED_KEY, 'true');
      else localStorage.removeItem(ACCEPTED_KEY);
      updateContinueLink(isAccepted);
      if (isAccepted) continueLink?.focus();
    };

    checkbox?.addEventListener('change', onChange);

    if (window.location.hash === '#terms-acceptance') {
      requestAnimationFrame(() => {
        termsPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }

    return () => checkbox?.removeEventListener('change', onChange);
  }, []);

  return null;
}
