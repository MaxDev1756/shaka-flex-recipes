import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['tab', 'panel'];

  select(event) {
    const language = event.params.language;

    this.tabTargets.forEach((tab) => {
      const active = tab.dataset.shakaCodeTabsLanguageParam === language;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    this.panelTargets.forEach((panel) => {
      const active = panel.dataset.language === language;
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
    });
  }
}
