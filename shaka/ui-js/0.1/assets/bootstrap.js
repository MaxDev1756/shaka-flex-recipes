import { startStimulusApp } from '@symfony/stimulus-bundle';
import { registerShakaControllers } from './controllers/index.js';

const app = startStimulusApp();

registerShakaControllers(app);

export { app };
