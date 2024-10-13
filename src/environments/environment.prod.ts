import { env_common } from './env.common';

export const environment = {
  production: true,
  version: '',
  serverUrl: '',
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US'],
  cookieName: env_common['cookieName'],
  serverHeaders: env_common['serverHeaders'],
};
