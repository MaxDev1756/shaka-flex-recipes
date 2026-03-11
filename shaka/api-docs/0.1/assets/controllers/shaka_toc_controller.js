import { Controller } from '@hotwired/stimulus';

/**
 * TOC — auto-builds table of contents + scroll-spy.
 *
 * Usage:
 *   <nav data-controller="shaka-toc"
 *        data-shaka-toc-content-value="#main-content"
 *        data-shaka-toc-headings-value="h2,h3">
 *     <p class="shaka-toc__heading">On this page</p>
 *     <ul class="shaka-toc__list" data-shaka-toc-target="list"></ul>
 *   </nav>
 */
export default class extends Controller {
  static targets = ['list'];
  static values  = {
    content:  { type: String, default: '.shaka-api-page__content' },
    headings: { type: String, default: 'h2[id], h3[id]' },
  };

  connect() {
    const container = document.querySelector(this.contentValue);
    if (!container || !this.hasListTarget) return;

    const headings = [...container.querySelectorAll(this.headingsValue)];
    if (headings.length === 0) return;

    this.#build(headings);
    this.#spy(headings);
  }

  disconnect() {
    this._observer?.disconnect();
  }

  #build(headings) {
    const fragment = document.createDocumentFragment();

    headings.forEach(h => {
      const li = document.createElement('li');
      const a  = document.createElement('a');
      a.href      = `#${h.id}`;
      a.textContent = h.textContent.replace(/^#+\s*/, '').trim();
      a.className = 'shaka-toc__link';

      if (h.tagName === 'H3') {
        a.classList.add('shaka-toc__link--sub');
      }

      li.appendChild(a);
      fragment.appendChild(li);
    });

    this.listTarget.appendChild(fragment);
  }

  #spy(headings) {
    const links = this.listTarget.querySelectorAll('a');

    this._observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        links.forEach(l => l.classList.remove('is-active'));

        const active = this.listTarget.querySelector(
          `a[href="#${entry.target.id}"]`
        );
        active?.classList.add('is-active');
      });
    }, { rootMargin: '-64px 0px -65% 0px', threshold: 0 });

    headings.forEach(h => this._observer.observe(h));
  }
}
