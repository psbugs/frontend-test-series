// app/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Reducers
import usersReducer from './slices/usersSlice';
import testSeriesReducer from './slices/testSeriesSlice';
import analyticsReducer from './slices/analyticsSlice';
import learnerTestSeriesReducer from './slices/learnerTestSlice';

// Combine all reducers
const rootReducer = combineReducers({
  users: usersReducer,
  testSeries: testSeriesReducer,
  analytics: analyticsReducer,
  learnerTest: learnerTestSeriesReducer,
});

// Define persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['users'], // only persist users slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Required for redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
