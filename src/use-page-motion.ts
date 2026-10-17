import { useEffect } from 'react';

const groups = [
  '.content-section-heading', '.portfolio-card', '.journal-card', '.principle',
  '.viewpoint-content>h2', '.viewpoint-description', '.practice-intro', '.practice-item',
  '.home-about>div', '.contact-layout>div', '.contact-button', '.footer-top>div', '.footer-top>nav',
  '.journal-intro', '.journal-topicbar', '.journal-author', '.journal-recommend', '.journal-side-note',
  '.page-title', '.project-detail-heading', '.project-detail>.page-shell>.portfolio-cover',
  '.project-overview>div', '.project-gallery>.content-section-heading',
  '.about-hero-copy', '.about-identity-art', '.about-facts>div', '.about-note-layout>div', '.about-note-layout>h2',
  '.about-journey-layout>div', '.about-timeline>li', '.about-interest-grid>article', '.about-photo',
  '.journal-post-header', '.journal-post-cover',
].join(',');

export function usePageMotion(path: string) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches || !('IntersectionObserver' in window)) return;
    const registered = new Set<HTMLElement>();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.dataset.reveal = 'visible';
        observer.unobserve(el);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -18px 0px' });
    function register() {
      document.querySelectorAll<HTMLElement>(groups).forEach(el => {
        if (registered.has(el)) return;
        registered.add(el);
        const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
        const stagger = Math.max(0, siblings.indexOf(el)) % 3;
        el.style.setProperty('--reveal-delay', `${stagger * 65}ms`);
        // Do not hide content above the viewport when filters or browser history change.
        el.dataset.reveal = el.getBoundingClientRect().bottom < 0 ? 'visible' : 'pending';
        observer.observe(el);
      });
    }
    register();
    const mutations = new MutationObserver(register);
    const main = document.querySelector('main');
    if (main) mutations.observe(main, { childList: true, subtree: true });
    const showAll = () => {
      if (!reduced.matches) return;
      registered.forEach(el => { el.dataset.reveal = 'visible'; });
    };
    reduced.addEventListener('change', showAll);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      reduced.removeEventListener('change', showAll);
      registered.forEach(el => { delete el.dataset.reveal; });
    };
  }, [path]);
}
