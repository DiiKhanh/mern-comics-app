import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import appStateSlice from './features/appStateSlice';
import gloabalLoadingSlice from './features/gloabalLoadingSlice';
import authModalSlice from './features/authModalSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    appState: appStateSlice,
    globalLoading: gloabalLoadingSlice,
    authModal: authModalSlice
  }
});

export default store;