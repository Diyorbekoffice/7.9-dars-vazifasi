import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import languageReducer from './languageSlice';
import themeReducer from './themeSlice';

const store = configureStore({
  reducer: {
    usersData: usersReducer,
    languageData: languageReducer,
    themeData: themeReducer,
  },
});

export default store;
