import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { LanguageProvider } from './context/LanguageContext'; 
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  // ❌ Remove <React.StrictMode>
  <BrowserRouter basename="/">
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </BrowserRouter>
);
