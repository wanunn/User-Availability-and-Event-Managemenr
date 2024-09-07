import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./User/User";
import {thunk} from 'redux-thunk';
import eventReducer from "./User/Event";
const store = configureStore({
  reducer: {
    user: userReducer,
    event: eventReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export default store;
