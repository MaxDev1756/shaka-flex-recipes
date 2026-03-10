import ShakaDropdownController from "./shaka_dropdown_controller.js";
import ShakaModalController from "./shaka_modal_controller.js";
import ShakaNavbarController from "./shaka_navbar_controller.js";
import ShakaCodeTabsController from "./shaka_code_tabs_controller.js";
import ShakaCopyCodeController from "./shaka_copy_code_controller.js";

export function registerShakaControllers(app) {
  app.register("shaka-dropdown", ShakaDropdownController);
  app.register("shaka-modal", ShakaModalController);
  app.register("shaka-navbar", ShakaNavbarController);
  app.register("shaka-code-tabs", ShakaCodeTabsController);
  app.register("shaka-copy-code", ShakaCopyCodeController);
}
