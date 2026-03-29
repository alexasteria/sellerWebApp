import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { CartState, DeliveryInfo } from "@/types";
import { ModelsProduct } from "@/backendApi";
import { useServices } from "@/hooks/useServices";
import { useProducts } from "./ProductContext";

interface CartContextType {
  cart: CartState;
  deliveryInfo: DeliveryInfo | null;
  cartItemCount: number;
  cartTotal: number;
  increment: (product: ModelsProduct, variantID: number | undefined) => void;
  decrement: (product: ModelsProduct, variantID: number | undefined) => void;
  clearCart: () => void;
  setDeliveryInfo: (info: DeliveryInfo | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { cart: cartService } = useServices();
  const { products } = useProducts();
  const [cart, setCart] = useState<CartState>({});
  const [deliveryInfo, setDeliveryInfoState] = useState<DeliveryInfo | null>(null);

  const increment = useCallback((product: ModelsProduct, variantID: number | undefined) => {
    setCart((prev) => cartService.increment(prev, product, variantID));
  }, [cartService]);

  const decrement = useCallback((product: ModelsProduct, variantID: number | undefined) => {
    setCart((prev) => cartService.decrement(prev, product, variantID));
  }, [cartService]);

  const clearCart = useCallback(() => {
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
