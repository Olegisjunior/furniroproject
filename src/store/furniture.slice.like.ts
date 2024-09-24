import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FurnitureState {
  liked: number[];
}

const LS_FAV_KEY = "rlk";

const initialState: FurnitureState = {
  liked: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? "[]"),
};

export const likedSlice = createSlice({
  name: "liked",
  initialState,
  reducers: {
    addLike(state, action: PayloadAction<number>) {
      const exist = state.liked.includes(action.payload);
      if (!exist) {
        state.liked.push(action.payload);
        localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.liked));
      }
    },
    removeLike(state, action: PayloadAction<number>) {
      state.liked = state.liked.filter((f) => f !== action.payload);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.liked));
    },
  },
});

export const likedSliceActions = likedSlice.actions;
export const likedSliceReducer = likedSlice.reducer;
