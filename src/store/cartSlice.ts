import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, DeliveryInfo } from "@/types";
import { ModelsProduct } from "@/backendApi";
import { cartService } from "@/services/CartService";

interface CartSliceState {
  cart: CartState;
  deliveryInfo: DeliveryInfo | null;
  // total and hasItems will be selectors
}

const initialState: CartSliceState = {
  cart: {},
  deliveryInfo: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (
      state,
      action: PayloadAction<{ product: ModelsProduct; variantID: number | undefined }>
    ) => {
      const { product, variantID } = action.payload;
      if (product.id === undefined) return;
      state.cart = cartService.addItem(state.cart, product.id, variantID);
    },
    decrement: (
      state,
      action: PayloadAction<{ product: ModelsProduct; variantID: number | undefined }>
    ) => {
      const { product, variantID } = action.payload;
      if (product.id === undefined) return;
      state.cart = cartService.removeItem(state.cart, product.id, variantID);
    },
    clearCart: (state) => {
      state.cart = {};
    },
    setDeliveryInfo: (state, action: PayloadAction<DeliveryInfo | null>) => {
      state.deliveryInfo = action.payload;
    },
  },
});

export const { increment, decrement, clearCart, setDeliveryInfo } = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
// These will depend on the products state, so they might be better as reselect selectors or computed in components
// For now, let's just expose the cart state
export const selectCart = (state: { cart: CartSliceState }) => state.cart.cart;
export const selectDeliveryInfo = (state: { cart: CartSliceState }) => state.cart.deliveryInfo;

// This selector needs access to the products state, so it should be defined outside or take products as argument
export const selectCartTotal = (state: { cart: CartSliceState; products: { products: ModelsProduct[] } }) => {
    return cartService.calculateTotal(state.cart.cart, state.products.products);
};

export const selectHasItems = (state: { cart: CartSliceState; products: { products: ModelsProduct[] } }) => {
    return cartService.calculateTotal(state.cart.cart, state.products.products) > 0;
};
