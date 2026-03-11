import { Controller } from '@hotwired/stimulus';

/**
 * CodeTabs controller — switches between language tabs in a code block.
 *
 * Supports both the new .shaka-code-block and legacy .shaka-code-tabs markup.
 */
export default class extends Controller {
  static targets = ['tab', 'panel'];

  connect() {
    // Ensure first tab is active if none is
    if (!this.tabTargets.some(t => t.classList.contains('is-active'))) {
      this.#activate(this.tabTargets[0]?.dataset?.shakaCodeTabsLanguageParam);
    }
  }

  select(event) {
    this.#activate(event.params.language);
  }

  #activate(language) {
    if (!language) return;

    this.tabTargets.forEach(tab => {
      const active = tab.dataset.shakaCodeTabsLanguageParam === language;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    this.panelTargets.forEach(panel => {
      const active = panel.dataset.language === language;
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
    });
  }
}
