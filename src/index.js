import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { LanguageProvider } from './context/LanguageContext'; // Import the LanguageProvider
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider> {/* Wrap your App with LanguageProvider */}
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
