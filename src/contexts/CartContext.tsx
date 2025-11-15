import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";
import { CartState, DeliveryInfo } from "@/types";
import { useProducts } from "@/contexts/ProductsContext";
import { cartService } from "@/services/CartService";
import { ModelsProduct } from "@/backendApi";

interface CartContextType {
  cart: CartState;
  total: number;
  hasItems: boolean;
  increment: (product: ModelsProduct, variantID: string) => void;
  decrement: (product: ModelsProduct, variantID:string) => void;
  clearCart: () => void;
  deliveryInfo: DeliveryInfo | null;
  setDeliveryInfo: React.Dispatch<React.SetStateAction<DeliveryInfo | null>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartState>({});
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null);
  const { products } = useProducts();

  const total = useMemo(
    () => cartService.calculateTotal(cart, products),
    [cart, products]
  );

  const hasItems = total > 0;

  const increment = useCallback((product: ModelsProduct, variantID: string) => {
    setCart(prevCart => cartService.addItem(prevCart, product.id, variantID));
  }, []);

  const decrement = useCallback((product: ModelsProduct, variantID: string) => {
    setCart(prevCart => cartService.removeItem(prevCart, product.id, variantID));
  }, []);

  const clearCart = useCallback(() => setCart({}), []);

  const value = useMemo(
    () => ({
      cart,
      total,
      hasItems,
      increment,
      decrement,
      clearCart,
      deliveryInfo,
      setDeliveryInfo,
    }),
    [
      cart,
      total,
      hasItems,
      increment,
      decrement,
      clearCart,
      deliveryInfo,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
