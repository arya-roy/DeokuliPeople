import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App1';
import './i18n/i18n'; // connect i18n

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
