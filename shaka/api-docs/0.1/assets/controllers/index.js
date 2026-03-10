import ShakaCodeTabsController from './shaka_code_tabs_controller.js';
import ShakaCopyCodeController from './shaka_copy_code_controller.js';

export function registerShakaApiDocsControllers(app) {
  app.register('shaka-code-tabs', ShakaCodeTabsController);
  app.register('shaka-copy-code', ShakaCopyCodeController);
}
