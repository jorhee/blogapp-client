import React from 'react';
//import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import './index.css';
import 'notyf/notyf.min.css';
import App from './App';

//newversion Auth
import { AuthProvider } from './context/AuthContext';
import { createRoot } from 'react-dom/client';

/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

*/

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);