import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Providers from 'shared/Providers';
import store from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Providers>
          <App />
        </Providers>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
