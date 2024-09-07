import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./Admin/User";
import {thunk} from 'redux-thunk';
import eventReducer from "./Admin/Event";
import adminReducer from "./Admin/Admin";
const store = configureStore({
  reducer: {
    user: userReducer,
    event: eventReducer,
    admin:adminReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export default store;
