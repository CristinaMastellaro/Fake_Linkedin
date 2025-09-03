import { combineReducers, configureStore } from "@reduxjs/toolkit";
import saveProfileMe from "../reducers/saveProfileMe";

const store = configureStore({
  reducer: combineReducers({
    saveProfileMe,
  }),
});

export default store;
