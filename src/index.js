import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' in React 18+
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css'; // Ensure Tailwind CSS file is imported

// Create a root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Initial render
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
