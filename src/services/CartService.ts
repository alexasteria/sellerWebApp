import { CartState } from "@/types";
import { SellerGoApiInternalApientProductResponse } from "@/backendApi";

export class CartService {
  increment(prevCart: CartState, product: SellerGoApiInternalApientProductResponse, variantID: number | undefined): CartState {
    if (product.id === undefined || variantID === undefined) return prevCart;
    
    const newCart = { ...prevCart };
    const productIdStr = String(product.id);
    const variantIdStr = String(variantID);
    const variantState = newCart[productIdStr] || {};

    newCart[productIdStr] = {
      ...variantState,
      [variantIdStr]: (variantState[variantIdStr] || 0) + 1,
    };

    return newCart;
  }

  decrement(prevCart: CartState, product: SellerGoApiInternalApientProductResponse, variantID: number | undefined): CartState {
    if (product.id === undefined || variantID === undefined) return prevCart;

    const newCart = { ...prevCart };
    const productIdStr = String(product.id);
    const variantIdStr = String(variantID);
    const variantState = newCart[productIdStr];

    if (!variantState || !variantState[variantIdStr]) {
      return prevCart;
    }

    const newCount = variantState[variantIdStr] - 1;

    if (newCount <= 0) {
      delete variantState[variantIdStr];
      if (Object.keys(variantState).length === 0) {
        delete newCart[productIdStr];
      }
    } else {
      variantState[variantIdStr] = newCount;
    }

    return newCart;
  }

  calculateTotal(cart: CartState, products: SellerGoApiInternalApientProductResponse[]): number {
    const total = Object.entries(cart).reduce((sum, [productIdStr, variantState]) => {
      const productId = Number(productIdStr);
      const item = products.find((p) => p.id === productId);
      if (!item) return sum;

      const itemTotal = Object.entries(variantState).reduce(
        (variantSum, [variantIdStr, count]) => {
          const variantId = Number(variantIdStr);
          const variant = (item.variants || []).find((v) => v.id === variantId);
          if (!variant) return variantSum;

          const variantPrice = (variant.cost || 0) * 100; // cents
          const discountedPrice = item.discount
            ? variantPrice * (1 - item.discount / 100)
            : variantPrice;

          return variantSum + discountedPrice * count;
        },
        0
      );

      return sum + itemTotal;
    }, 0);

    return parseFloat((total / 100).toFixed(2));
  }

  getCartItemCount(cart: CartState): number {
    let count = 0;
    for (const productId of Object.keys(cart)) {
      for (const qty of Object.values(cart[Number(productId)])) {
        count += qty;
      }
    }
    return count;
  }
}
