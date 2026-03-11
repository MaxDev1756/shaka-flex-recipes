import { Controller } from '@hotwired/stimulus';

/**
 * Sidebar controller — handles mobile open/close + TOC highlighting.
 *
 * Usage:
 *   <aside data-controller="shaka-sidebar" class="shaka-api-sidebar">
 *     <button data-action="click->shaka-sidebar#close">✕</button>
 *     ...
 *   </aside>
 *   <button data-action="click->shaka-sidebar#open">Menu</button>
 */
export default class extends Controller {
  static targets = ['nav'];

  connect() {
    // Highlight active link based on current URL
    this.#setActiveLink();

    // Scroll-spy: update active TOC link
    this._observer = new IntersectionObserver(this.#onIntersect.bind(this), {
      rootMargin: '-60px 0px -70% 0px',
    });

    document.querySelectorAll('section[id], h2[id], h3[id]').forEach(el => {
      this._observer.observe(el);
    });
  }

  disconnect() {
    this._observer?.disconnect();
  }

  open() {
    this.element.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    this.element.focus();
  }

  close() {
    this.element.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  #setActiveLink() {
    const path = window.location.pathname;
    this.element.querySelectorAll('a').forEach(link => {
      const active = link.getAttribute('href') === path;
      link.classList.toggle('is-active', active);
    });
  }

  #onIntersect(entries) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      this.element.querySelectorAll(`a[href="#${id}"]`).forEach(link => {
        // Remove from all then set active
        this.element.querySelectorAll('a[href^="#"]').forEach(l => l.classList.remove('is-active'));
        link.classList.add('is-active');
      });
    });
  }
}
