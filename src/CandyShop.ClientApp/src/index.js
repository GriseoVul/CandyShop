import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import MyContextProvider from './Modules/MyContext';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <MyContextProvider>
    <App />
  </MyContextProvider>
  </BrowserRouter>
);
reportWebVitals();
