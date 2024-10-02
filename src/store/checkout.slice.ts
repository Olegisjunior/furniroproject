import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type QuantityItem = {
  id: number;
  quan: number;
};

interface SelectedColor {
  productId: number;
  color: string;
}

type SizeItem = {
  id: number;
  size: string;
};

export interface ICheckoutItems {
  items: Array<{ id: number; quantity: number }>;
  quantity: QuantityItem[];
  color: SelectedColor[];
  totalPrice: number;
  size: SizeItem[];
}

const initialState: ICheckoutItems = {
  items: [],
  quantity: [],
  color: [],
  totalPrice: 0,
  size: [],
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckoutData(
      state: ICheckoutItems,
      action: PayloadAction<Partial<ICheckoutItems>>
    ) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setCheckoutData } = checkoutSlice.actions;
export default checkoutSlice.reducer;
