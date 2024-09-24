import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FurnitureState {
  favorites: { id: number; quantity: number }[];
}

const LS_FAV_KEY = "rfk";

const initialState: FurnitureState = {
  favorites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? "[]"),
};

export const furnitureSlice = createSlice({
  name: "furniture",
  initialState,
  reducers: {
    addFavorite(
      state,
      action: PayloadAction<{ id: number; quantity?: number }>
    ) {
      const { id, quantity = 1 } = action.payload;
      const exist = state.favorites.find((f) => f.id === id);
      if (!exist) {
        state.favorites.push({ id, quantity });
        localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites));
      } else {
        exist.quantity += quantity;
        localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites));
      }
    },
    updateFavoriteQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const favorite = state.favorites.find((f) => f.id === action.payload.id);
      if (favorite) {
        favorite.quantity = action.payload.quantity;
      }
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter((f) => f.id !== action.payload);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites));
    },
  },
});

export const furnitureActions = furnitureSlice.actions;
export const furnitureReducer = furnitureSlice.reducer;
