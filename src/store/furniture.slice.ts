import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FurnitureState {
  favorites: number[];
}

const LS_FAV_KEY = "rfk";

const initialState: FurnitureState = {
  favorites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? "[]"),
};

export const furnitureSlice = createSlice({
  name: "furniture",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<number>) {
      const exist = state.favorites.includes(action.payload);
      if (!exist) {
        state.favorites.push(action.payload);
        localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites));
      }
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter((f) => f !== action.payload);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites));
    },
  },
});

export const furnitureActions = furnitureSlice.actions;
export const furnitureReducer = furnitureSlice.reducer;
