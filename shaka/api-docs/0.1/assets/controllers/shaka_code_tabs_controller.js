import { Controller } from '@hotwired/stimulus';

/**
 * CodeTabs — switches language tabs in a code block.
 *
 * data-controller="shaka-code-tabs"
 *
 * Targets:
 *   tab   — clickable tab buttons
 *   panel — code panels
 */
export default class extends Controller {
  static targets = ['tab', 'panel'];

  connect() {
    // Activate first tab if none selected yet
    const active = this.tabTargets.find(t => t.classList.contains('is-active'));
    if (!active && this.tabTargets.length > 0) {
      this.#activate(this.tabTargets[0].dataset.shakaCodeTabsLanguageParam);
    }
  }

  select(event) {
    this.#activate(event.params.language);
  }

  // Keyboard: left/right arrow keys
  keydown(event) {
    const tabs = this.tabTargets;
    const current = tabs.findIndex(t => t === document.activeElement);
    if (current === -1) return;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      tabs[(current + 1) % tabs.length].focus();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      tabs[(current - 1 + tabs.length) % tabs.length].focus();
    }
  }

  #activate(language) {
    if (!language) return;

    this.tabTargets.forEach(tab => {
      const isActive = tab.dataset.shakaCodeTabsLanguageParam === language;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
      tab.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    this.panelTargets.forEach(panel => {
      const isActive = panel.dataset.language === language;
      panel.classList.toggle('is-active', isActive);
      panel.hidden = !isActive;
    });
  }
}
