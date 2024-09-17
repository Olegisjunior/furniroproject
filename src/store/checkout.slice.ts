import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type QuantityItem = {
  id: number;
  quan: number;
};

interface color {
  productId: number;
  color: string | undefined;
}

export interface ICheckoutItems {
  items: number[];
  quantity: Array<QuantityItem>;
  color: any;
  totalPrice: number;
}

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    items: [0],
    quantity: [{} as QuantityItem],
    color: [{} as color],
    totalPrice: 0,
  },
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
