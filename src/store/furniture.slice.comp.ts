import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FurnitureState {
  compareItems: number[];
}

const LS_FAV_KEY = "rck";

const initialState: FurnitureState = {
  compareItems: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? "[]"),
};

export const furnitureSliceComp = createSlice({
  name: "furnitureComp",
  initialState,
  reducers: {
    addCompare(state, action: PayloadAction<number>) {
      const exist = state.compareItems.includes(action.payload);
      if (!exist && state.compareItems.length < 4) {
        state.compareItems.push(action.payload);
        localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.compareItems));
      }
    },
    removeCompare(state, action: PayloadAction<number>) {
      state.compareItems = state.compareItems.filter(
        (f) => f !== action.payload
      );
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.compareItems));
    },
  },
});

export const furnitureActionsComp = furnitureSliceComp.actions;
export const furnitureReducerComp = furnitureSliceComp.reducer;
