import { Controller } from '@hotwired/stimulus';

/**
 * Endpoint — collapsible endpoint card.
 *
 * Usage:
 *   <article data-controller="shaka-endpoint"
 *            data-method="GET"
 *            class="shaka-endpoint">
 *
 *     <header class="shaka-endpoint__header"
 *             data-action="click->shaka-endpoint#toggle"
 *             data-shaka-endpoint-target="trigger"
 *             aria-expanded="false">...</header>
 *
 *     <div class="shaka-endpoint__body"
 *          data-shaka-endpoint-target="body"
 *          hidden>...</div>
 *   </article>
 *
 * Add data-open on the article to expand by default.
 */
export default class extends Controller {
  static targets = ['body', 'trigger'];

  connect() {
    const openByDefault = this.element.hasAttribute('data-open');
    this.#setState(openByDefault, false); // no animation on connect
  }

  toggle() {
    this.#setState(!this.element.classList.contains('is-open'));
  }

  open()  { this.#setState(true); }
  close() { this.#setState(false); }

  #setState(open, animate = true) {
    this.element.classList.toggle('is-open', open);

    if (this.hasBodyTarget) {
      if (open) {
        this.bodyTarget.hidden = false;
        if (animate) {
          this.bodyTarget.style.animation = 'none';
          // Small trick to trigger reflow for animation
          void this.bodyTarget.offsetHeight;
          this.bodyTarget.style.animation = '';
        }
      } else {
        this.bodyTarget.hidden = true;
      }
    }

    if (this.hasTriggerTarget) {
      this.triggerTarget.setAttribute('aria-expanded', String(open));
    }
  }
}
