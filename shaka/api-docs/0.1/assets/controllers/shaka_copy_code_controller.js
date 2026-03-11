import { Controller } from '@hotwired/stimulus';

/**
 * CopyCode — copies visible code panel content to clipboard.
 *
 * data-controller="shaka-copy-code"
 * data-action="click->shaka-copy-code#copy"
 *
 * The controller looks for code inside the nearest code block ancestor.
 * Falls back to a CSS selector via data-shaka-copy-code-target-value.
 */
export default class extends Controller {
  static values = { target: String };

  async copy() {
    const code = this.#findCode();
    if (!code) return;

    const text = code.textContent?.trim() ?? '';

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        this.#legacyCopy(text);
      }
      this.#feedback('Copied!', true);
    } catch {
      this.#feedback('Failed', false);
    }
  }

  #findCode() {
    // 1. Look in nearest ancestor code block
    const block = this.element.closest('.shaka-code-block, .shaka-code-tabs');
    if (block) {
      return (
        block.querySelector('.shaka-code-block__panel:not([hidden]) code') ??
        block.querySelector('.shaka-code-tabs__panel.is-active code')
      );
    }

    // 2. Fallback: use provided selector value
    if (this.hasTargetValue) {
      return document.querySelector(this.targetValue);
    }

    return null;
  }

  #legacyCopy(text) {
    const ta = Object.assign(document.createElement('textarea'), {
      value: text,
      style: 'position:fixed;opacity:0',
    });
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }

  #feedback(label, success) {
    const original = this.element.textContent;
    this.element.textContent = label;
    this.element.classList.toggle('is-copied', success);
    this.element.disabled = true;

    setTimeout(() => {
      this.element.textContent = original;
      this.element.classList.remove('is-copied');
      this.element.disabled = false;
    }, 1800);
  }
}
