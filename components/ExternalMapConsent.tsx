'use client';

import { useEffect } from 'react';

const SELECTOR = '[data-google-map]';

function loadMap(container: HTMLElement) {
  const src = container.dataset.mapSrc;
  const title = container.dataset.mapTitle;
  if (!src || !title || container.dataset.loaded === 'true') return;

  const iframe = document.createElement('iframe');
  iframe.src = src;
  iframe.title = title;
  iframe.loading = 'lazy';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.allowFullscreen = true;

  container.replaceChildren(iframe);
  container.dataset.loaded = 'true';
}

export function ExternalMapConsent() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const button = target.closest<HTMLButtonElement>('[data-load-google-map]');
      if (!button) return;

      const container = button.closest<HTMLElement>(SELECTOR);
      if (container) loadMap(container);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
