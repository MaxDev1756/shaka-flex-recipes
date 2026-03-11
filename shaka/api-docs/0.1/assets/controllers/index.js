import ShakaCodeTabsController  from './shaka_code_tabs_controller.js';
import ShakaCopyCodeController  from './shaka_copy_code_controller.js';
import ShakaEndpointController  from './shaka_endpoint_controller.js';
import ShakaSidebarController   from './shaka_sidebar_controller.js';
import ShakaTocController       from './shaka_toc_controller.js';

/**
 * Register all Shaka API Docs Stimulus controllers.
 *
 * @param {import('@hotwired/stimulus').Application} app
 */
export function registerShakaApiDocsControllers(app) {
  app.register('shaka-code-tabs', ShakaCodeTabsController);
  app.register('shaka-copy-code', ShakaCopyCodeController);
  app.register('shaka-endpoint',  ShakaEndpointController);
  app.register('shaka-sidebar',   ShakaSidebarController);
  app.register('shaka-toc',       ShakaTocController);
}

export {
  ShakaCodeTabsController,
  ShakaCopyCodeController,
  ShakaEndpointController,
  ShakaSidebarController,
  ShakaTocController,
};
