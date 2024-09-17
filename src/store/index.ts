//
import { configureStore } from "@reduxjs/toolkit";
import { furnitureApi } from "./furnitureApi";
import { furnitureReducer } from "./furniture.slice";
import { setupListeners } from "@reduxjs/toolkit/query";
import checkoutSlice from "./checkout.slice";

export const store = configureStore({
  reducer: {
    [furnitureApi.reducerPath]: furnitureApi.reducer,
    furniture: furnitureReducer,
    checkout: checkoutSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(furnitureApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
