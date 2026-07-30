import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { CartState, DeliveryInfo } from "@/types";
import { SellerGoApiInternalApientProductResponse } from "@/backendApi";
import { useServices } from "@/hooks/useServices";
import { useProducts } from "./ProductContext";
import { triggerHaptic } from "@/hooks/useTelegram";

interface CartContextType {
  cart: CartState;
  deliveryInfo: DeliveryInfo | null;
  cartItemCount: number;
  cartTotal: number;
  increment: (product: SellerGoApiInternalApientProductResponse, variantID: number | undefined) => void;
  decrement: (product: SellerGoApiInternalApientProductResponse, variantID: number | undefined) => void;
  clearCart: () => void;
  setDeliveryInfo: (info: DeliveryInfo | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { cart: cartService } = useServices();
  const { products } = useProducts();
  const [cart, setCart] = useState<CartState>({});
  const [deliveryInfo, setDeliveryInfoState] = useState<DeliveryInfo | null>(null);

  const increment = useCallback((product: SellerGoApiInternalApientProductResponse, variantID: number | undefined) => {
    triggerHaptic("light");
    setCart((prev) => cartService.increment(prev, product, variantID));
  }, [cartService]);

  const decrement = useCallback((product: SellerGoApiInternalApientProductResponse, variantID: number | undefined) => {
    triggerHaptic("light");
    setCart((prev) => cartService.decrement(prev, product, variantID));
  }, [cartService]);

  const clearCart = useCallback(() => {
    triggerHaptic("rigid");
    setCart({});
  }, []);

  const setDeliveryInfo = useCallback((info: DeliveryInfo | null) => {
    setDeliveryInfoState(info);
  }, []);

  const cartItemCount = cartService.getCartItemCount(cart);
  const cartTotal = cartService.calculateTotal(cart, products);

  return (
    <CartContext.Provider value={{
      cart, deliveryInfo, cartItemCount, cartTotal,
      increment, decrement, clearCart, setDeliveryInfo
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
