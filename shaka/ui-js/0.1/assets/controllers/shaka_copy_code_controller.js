import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static values = { target: String };

  async copy() {
    const selector = this.targetValue;
    const code = document.querySelector(selector);

    if (!code) {
      return;
    }

    try {
      await navigator.clipboard.writeText(code.textContent.trim());
      this.element.textContent = 'Copied';

      setTimeout(() => {
        this.element.textContent = 'Copy';
      }, 1500);
    } catch (error) {
      console.error('Failed to copy code', error);
    }
  }
}
