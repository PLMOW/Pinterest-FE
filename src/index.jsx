import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Providers from 'shared/Providers';
import store from 'redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Providers>
        <App />
      </Providers>
    </Provider>
  </React.StrictMode>
);
