import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import AuthContext from './component/context/AuthContext';
import Store from './component/store/index';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={Store}>
        <AuthContext>
        <App />
        </AuthContext>
      </Provider>
  </React.StrictMode>
);
reportWebVitals();
