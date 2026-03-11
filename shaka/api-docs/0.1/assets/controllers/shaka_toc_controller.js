import { Controller } from '@hotwired/stimulus';

/**
 * Table of Contents controller — auto-builds TOC from headings + scroll-spy.
 *
 * Usage:
 *   <nav data-controller="shaka-toc" data-shaka-toc-content-value=".shaka-api-page__content">
 *     <p class="shaka-toc__title">On this page</p>
 *     <ul class="shaka-toc__list" data-shaka-toc-target="list"></ul>
 *   </nav>
 */
export default class extends Controller {
  static targets = ['list'];
  static values  = { content: String };

  connect() {
    const container = this.hasContentValue
      ? document.querySelector(this.contentValue)
      : document.querySelector('.shaka-api-page__content');

    if (!container || !this.hasListTarget) return;

    const headings = container.querySelectorAll('h2[id], h3[id]');
    if (headings.length === 0) return;

    headings.forEach(h => {
      const li = document.createElement('li');
      const a  = document.createElement('a');
      a.href = `#${h.id}`;
      a.textContent = h.textContent.trim();
      a.className = 'shaka-toc__link';
      if (h.tagName === 'H3') a.style.paddingLeft = '1.25rem';
      li.appendChild(a);
      this.listTarget.appendChild(li);
    });

    // Scroll-spy
    const links = this.listTarget.querySelectorAll('a');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(l => l.classList.remove('is-active'));
        const active = this.listTarget.querySelector(`a[href="#${entry.target.id}"]`);
        active?.classList.add('is-active');
      });
    }, { rootMargin: '-60px 0px -70% 0px' });

    headings.forEach(h => observer.observe(h));
    this._observer = observer;
  }

  disconnect() {
    this._observer?.disconnect();
  }
}
