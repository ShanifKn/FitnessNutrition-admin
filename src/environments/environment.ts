import { env_common } from './env.common';

export const environment = {
  production: false,
  version: '',
  cookieName: env_common['cookieName'],
  serverHeaders: env_common['serverHeaders'],
  serverUrl: 'http://localhost:8001',
  // serverUrl: 'https://api.fitnmuscles.com:8002',
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US'],
};
