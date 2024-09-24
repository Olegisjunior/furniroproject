import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type QuantityItem = {
  id: number;
  quan: number;
};

interface SelectedColor {
  productId: number;
  color: string;
}

export interface ICheckoutItems {
  items: Array<{ id: number; quantity: number }>;
  quantity: QuantityItem[];
  color: SelectedColor[];
  totalPrice: number;
}

const initialState: ICheckoutItems = {
  items: [],
  quantity: [],
  color: [],
  totalPrice: 0,
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
