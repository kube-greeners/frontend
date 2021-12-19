import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboardSlice";
import { apiSlice } from "./apiSlice";

export default configureStore({
  reducer: {
    dashboard: dashboardReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
