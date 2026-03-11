import { Controller } from '@hotwired/stimulus';

/**
 * CopyCode controller — copies the active code panel to clipboard.
 *
 * Usage:
 *   data-controller="shaka-copy-code"
 *   data-action="click->shaka-copy-code#copy"
 *   data-shaka-copy-code-target-value=".shaka-code-block__panel:not([hidden]) code"
 */
export default class extends Controller {
  static values = { target: String };

  async copy() {
    const selector = this.targetValue || '.shaka-code-tabs__panel.is-active code';
    const codeEl = this.element.closest('[data-controller]')?.querySelector(selector)
      ?? document.querySelector(selector);

    if (!codeEl) return;

    try {
      await navigator.clipboard.writeText(codeEl.textContent.trim());
      this.#showFeedback('Copied!');
    } catch {
      // Fallback for insecure contexts
      const range = document.createRange();
      range.selectNodeContents(codeEl);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      document.execCommand('copy');
      window.getSelection()?.removeAllRanges();
      this.#showFeedback('Copied!');
    }
  }

  #showFeedback(text) {
    const original = this.element.textContent;
    this.element.textContent = text;
    this.element.classList.add('is-copied');
    setTimeout(() => {
      this.element.textContent = original;
      this.element.classList.remove('is-copied');
    }, 1800);
  }
}
