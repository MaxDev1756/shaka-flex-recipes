import { Controller } from '@hotwired/stimulus';

/**
 * Endpoint controller — collapses / expands endpoint card body.
 *
 * Usage:
 *   <article data-controller="shaka-endpoint" class="shaka-endpoint">
 *     <header class="shaka-endpoint__header"
 *             data-action="click->shaka-endpoint#toggle"
 *             data-shaka-endpoint-target="header">
 *       ...
 *     </header>
 *     <div class="shaka-endpoint__body" data-shaka-endpoint-target="body" hidden>
 *       ...
 *     </div>
 *   </article>
 */
export default class extends Controller {
  static targets = ['body', 'header'];

  connect() {
    // Collapsed by default unless data-open attr is set
    if (!this.element.hasAttribute('data-open')) {
      this.#setState(false);
    }
  }

  toggle() {
    const isOpen = this.element.classList.contains('is-open');
    this.#setState(!isOpen);
  }

  open()  { this.#setState(true); }
  close() { this.#setState(false); }

  #setState(open) {
    this.element.classList.toggle('is-open', open);
    if (this.hasBodyTarget) {
      this.bodyTarget.hidden = !open;
    }
  }
}
