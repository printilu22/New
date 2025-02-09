import { configureStore } from '@reduxjs/toolkit';

import { cryptoApi } from '../services/cryptoApi';
import { cryptoNewsApi } from '../services/cryptoNewsApi';
import { cryptoExchangesApi } from '../services/cryptoExchangesApi';

const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [cryptoExchangesApi.reducerPath]: cryptoExchangesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // For handling non-serializable data
    }).concat(
      cryptoApi.middleware,
      cryptoNewsApi.middleware,
      cryptoExchangesApi.middleware
    ),
  devTools: process.env.NODE_ENV !== 'production', // Disable Redux DevTools in production
});

export default store;
