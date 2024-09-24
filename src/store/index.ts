//
import { configureStore } from "@reduxjs/toolkit";
import { furnitureApi } from "./furnitureApi";
import { furnitureReducer } from "./furniture.slice";
import { furnitureReducerComp } from "./furniture.slice.comp";
import { setupListeners } from "@reduxjs/toolkit/query";
import checkoutSlice from "./checkout.slice";
import { likedSliceReducer } from "./furniture.slice.like";

export const store = configureStore({
  reducer: {
    [furnitureApi.reducerPath]: furnitureApi.reducer,
    furniture: furnitureReducer,
    compare: furnitureReducerComp,
    checkout: checkoutSlice,
    liked: likedSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(furnitureApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
