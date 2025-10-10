import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../feature/api/apiSlice";
import drawerReducer from "../feature/Drawer/DrawerSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    drawer: drawerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
