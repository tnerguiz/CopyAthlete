// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App'; // Make sure this path is correct
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
