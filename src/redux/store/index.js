import { combineReducers, configureStore } from "@reduxjs/toolkit";
import saveProfileMe from "../reducers/saveProfileMe";

const configStore = configureStore({
  reducer: combineReducers({
    saveProfileMe,
  }),
});

export default configStore;
