import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/auth.slice";

// Create a rootReducer object to hold all the reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

// Redux Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

// Create a persisted reducer using persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
});

// Create a persistor instance
export const persistor = persistStore(store);

// Extra types for TypeScript benefits
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Custom hooks for using dispatch and selector with types
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
