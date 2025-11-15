import { CartState } from "@/types";
import { ModelsProduct } from "@/backendApi";

/**
 * Service class for handling cart-related business logic.
 * This class is designed to be stateless; it takes the current state as input
 * and returns the new state, leaving state management to the caller (e.g., a React context).
 * It follows the Singleton pattern.
 */
class CartService {
  private static instance: CartService;

  /**
   * Private constructor to prevent direct instantiation.
   */
  private constructor() {}

  /**
   * Returns the singleton instance of the CartService.
   * @returns The singleton instance.
   */
  public static getInstance(): CartService {
    if (!CartService.instance) {
      CartService.instance = new CartService();
    }
    return CartService.instance;
  }

  /**
   * Calculates the total price of the items in the cart.
   * @param cart - The current state of the cart.
   * @param products - The list of all available products.
   * @returns The total price, formatted to two decimal places.
   */
  public calculateTotal(cart: CartState, products: ModelsProduct[]): number {
    const total = Object.entries(cart).reduce((sum, [productId, variantState]) => {
      const item = products.find((p) => p.id === productId);
      if (!item) return sum;

      const itemTotal = Object.entries(variantState).reduce((variantSum, [variantId, count]) => {
        const variant = item.variants.find((v) => v.id === variantId);
        if (!variant) return variantSum;

        const variantPrice = variant.cost * 100; // Work with integers (cents) to avoid floating point issues
        const discountedPrice = item.discount
          ? variantPrice * (1 - item.discount / 100)
          : variantPrice;
        
        return variantSum + (discountedPrice * count);
      }, 0);

      return sum + itemTotal;
    }, 0);

    return parseFloat((total / 100).toFixed(2));
  }

  /**
   * Adds an item to the cart and returns the new cart state.
   * @param prevCart - The previous cart state.
   * @param productId - The ID of the product to add.
   * @param variantId - The ID of the product variant to add.
   * @returns The new cart state.
   */
  public addItem(prevCart: CartState, productId: string, variantId: string): CartState {
    const newCart = { ...prevCart };
    const variantState = newCart[productId] || {};
    
    newCart[productId] = {
      ...variantState,
      [variantId]: (variantState[variantId] || 0) + 1,
    };

    return newCart;
  }

  /**
   * Removes an item from the cart and returns the new cart state.
   * @param prevCart - The previous cart state.
   * @param productId - The ID of the product to remove.
   * @param variantId - The ID of the product variant to remove.
   * @returns The new cart state.
   */
  public removeItem(prevCart: CartState, productId: string, variantId: string): CartState {
    const newCart = { ...prevCart };
    const variantState = newCart[productId];

    if (!variantState || !variantState[variantId]) {
      return prevCart; // Item not in cart, do nothing
    }

    const newCount = variantState[variantId] - 1;

    if (newCount <= 0) {
      delete variantState[variantId];
      // If no variants are left for this product, remove the product entry itself
      if (Object.keys(variantState).length === 0) {
        delete newCart[productId];
      }
    } else {
      variantState[variantId] = newCount;
    }

    return newCart;
  }
}

export const cartService = CartService.getInstance();
