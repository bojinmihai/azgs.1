'use client';

import { useEffect } from 'react';

export function MobileNavScript() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>('.site-header');
    const toggle = document.querySelector<HTMLButtonElement>('.mobile-toggle');
    const nav = document.getElementById('main-nav');
    if (!header || !toggle || !nav) return;

    const closeMenu = () => {
      header.dataset.menuOpen = 'false';
      toggle.setAttribute('aria-expanded', 'false');
      document.querySelectorAll<HTMLElement>('.has-dropdown').forEach((dropdown) => {
        dropdown.dataset.open = 'false';
        dropdown.classList.remove('is-expanded');
        dropdown.querySelector('a')?.setAttribute('aria-expanded', 'false');
      });
    };

    const onToggle = () => {
      const open = header.dataset.menuOpen === 'true';
      header.dataset.menuOpen = open ? 'false' : 'true';
      toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    };
    toggle.addEventListener('click', onToggle);

    const onResize = () => {
      if (window.innerWidth > 900) closeMenu();
    };
    window.addEventListener('resize', onResize);

    const onLinkClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const dropdownLink = target.closest<HTMLElement>('.has-dropdown > a');
      if (dropdownLink) {
        e.preventDefault();
        const parent = dropdownLink.parentElement!;
        const expanded = !parent.classList.contains('is-expanded');
        parent.dataset.open = expanded ? 'true' : 'false';
        parent.classList.toggle('is-expanded', expanded);
        dropdownLink.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        return;
      }

      const navLink = target.closest<HTMLAnchorElement>('a');
      if (navLink && window.innerWidth <= 900) {
        closeMenu();
      }
    };
    nav.addEventListener('click', onLinkClick);

    const onDocumentClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!header.contains(target)) closeMenu();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const expandedLink = header.querySelector<HTMLAnchorElement>(
          '.has-dropdown.is-expanded > a'
        );
        closeMenu();
        (expandedLink ?? toggle).focus();
      }
    };

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      toggle.removeEventListener('click', onToggle);
      window.removeEventListener('resize', onResize);
      nav.removeEventListener('click', onLinkClick);
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return null;
}
