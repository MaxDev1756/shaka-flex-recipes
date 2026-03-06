import { Application } from '@hotwired/stimulus';

import ShakaDropdownController from './shaka_dropdown_controller';
import ShakaModalController from './shaka_modal_controller';
import ShakaNavbarController from './shaka_navbar_controller';

const application = Application.start();

application.register('shaka-dropdown', ShakaDropdownController);
application.register('shaka-modal', ShakaModalController);
application.register('shaka-navbar', ShakaNavbarController);

export { application };