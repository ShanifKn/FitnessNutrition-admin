import { env_common } from './env.common';

export const environment = {
  production: false,
  version: '',
  cookieName: env_common['cookieName'],
  serverHeaders: env_common['serverHeaders'],
  serverUrl: 'http://localhost:8001',
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US'],
};

// export const environment = {
//   production: false, // or true in prod
//   serverUrl: 'http://localhost:3000', // Your backend URL
//   cookieName: 'auth-token',
//   serverHeaders: {
//     'Content-Type': 'application/json',
//   },
// };
