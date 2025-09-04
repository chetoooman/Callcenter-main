
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/authContext';
import { AgenteProvider } from './context/AgenteContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AgenteProvider>
        <App />
      </AgenteProvider>
    </AuthProvider>
  </React.StrictMode>
);
