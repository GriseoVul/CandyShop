import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import MyContextProvider from './Modules/MyContext';
import reportWebVitals from './reportWebVitals';

async function enableMocking() {
  if (process.env.NODE_ENV === 'development'){
    const { worker } = await import("./mocks/browser")
    await worker.start();
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => registration.update());
      });
    }
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
enableMocking().then(()=>{
  root.render(
    <BrowserRouter>
    <MyContextProvider>
      <App />
    </MyContextProvider>
    </BrowserRouter>
  );
})
reportWebVitals();
