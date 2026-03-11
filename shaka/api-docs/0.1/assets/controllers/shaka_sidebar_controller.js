import { Controller } from '@hotwired/stimulus';

/**
 * Sidebar — mobile open/close + active link detection.
 *
 * Usage:
 *   <aside data-controller="shaka-sidebar" class="shaka-api-sidebar">
 *     <button data-action="click->shaka-sidebar#close">✕</button>
 *   </aside>
 *
 *   <!-- In topbar (different scope — direct DOM call) -->
 *   <button onclick="document.querySelector('[data-controller=shaka-sidebar]')
 *                     ?.__shakaSidebar?.open()">Menu</button>
 *
 *   <!-- Or with Stimulus outlet (preferred): -->
 *   <button data-controller="shaka-sidebar-trigger"
 *           data-action="click->shaka-sidebar-trigger#open">Menu</button>
 */
export default class extends Controller {

  connect() {
    // Expose instance for external access (topbar burger)
    this.element.__shakaSidebar = this;

    // Detect active page link
    this.#markActiveLinks();

    // Scroll-spy for hash links
    this._observer = new IntersectionObserver(
      this.#onIntersect.bind(this),
      { rootMargin: '-64px 0px -65% 0px', threshold: 0 }
    );
    document.querySelectorAll('[id]').forEach(el => this._observer.observe(el));
  }

  disconnect() {
    this._observer?.disconnect();
    this.element.__shakaSidebar = null;
    document.body.style.overflow = '';
  }

  open() {
    this.element.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    this.#showBackdrop(true);

    // Focus first link for accessibility
    requestAnimationFrame(() => {
      this.element.querySelector('a, button')?.focus();
    });
  }

  close() {
    this.element.classList.remove('is-open');
    document.body.style.overflow = '';
    this.#showBackdrop(false);
  }

  // ── Private ─────────────────────────────────────────────

  #markActiveLinks() {
    const path = window.location.pathname;
    this.element.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      // Exact match or exact page match (not just startsWith to avoid false positives)
      const isPage = href === path;
      const isHash = href.startsWith('#');
      link.classList.toggle('is-active', isPage);
      if (isHash) link.classList.remove('is-active'); // handled by scroll-spy
    });
  }

  #onIntersect(entries) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      if (!id) return;

      const hashLinks = this.element.querySelectorAll(`a[href="#${id}"]`);
      if (hashLinks.length === 0) return;

      // Remove from all hash links, then set
      this.element.querySelectorAll('a[href^="#"]')
        .forEach(l => l.classList.remove('is-active'));
      hashLinks.forEach(l => l.classList.add('is-active'));
    });
  }

  #showBackdrop(visible) {
    const backdrop = document.querySelector('.shaka-sidebar-backdrop');
    if (!backdrop) return;

    if (visible) {
      backdrop.style.display = 'block';
      requestAnimationFrame(() => backdrop.classList.add('is-visible'));
      backdrop.addEventListener('click', () => this.close(), { once: true });
    } else {
      backdrop.classList.remove('is-visible');
      setTimeout(() => { backdrop.style.display = 'none'; }, 200);
    }
  }
}
