import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import appStateSlice from './features/appStateSlice';
import globalLoadingSlice from './features/globalLoadingSlice';
import authModalSlice from './features/authModalSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    appState: appStateSlice,
    globalLoading: globalLoadingSlice,
    authModal: authModalSlice
  }
});

export default store;