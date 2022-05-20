import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import App from './App';

Sentry.init({
  dsn: 'https://4054a32a19eb443c9b02976e228804b4@o1254128.ingest.sentry.io/6421873',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  debug: true,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
