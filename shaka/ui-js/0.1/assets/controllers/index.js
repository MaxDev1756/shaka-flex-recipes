import ShakaDropdownController from './shaka_dropdown_controller.js';
import ShakaModalController from './shaka_modal_controller.js';
import ShakaNavbarController from './shaka_navbar_controller.js';

export function registerShakaControllers(app) {
    app.register('shaka-dropdown', ShakaDropdownController);
    app.register('shaka-modal', ShakaModalController);
    app.register('shaka-navbar', ShakaNavbarController);
}
