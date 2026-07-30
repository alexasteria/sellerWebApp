import {
  SellerGoApiInternalApientCreateOrderRequest,
  SellerGoApiInternalApientOrderResponse,
  SellerGoApiInternalApientProductResponse,
} from "@/backendApi";
import { apiClient } from "@/apiClient";
import { CartState, DeliveryInfo } from "@/types";

/**
 * Формирует payload для API создания заказа.
 */
const createOrderPayload = (
  cart: CartState,
  products: SellerGoApiInternalApientProductResponse[],
  userId: number,
  deliveryAddressText: string | null
): SellerGoApiInternalApientCreateOrderRequest => {
  const cartItems: SellerGoApiInternalApientCreateOrderRequest["cart"] = [];

  Object.entries(cart).forEach(([productIdStr, variantState]) => {
    const productId = Number(productIdStr);
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    Object.entries(variantState).forEach(([variantIdStr, count]) => {
      if (count <= 0) return;
      const variantId = Number(variantIdStr);
      const variant = product.variants?.find((v) => v.id === variantId);
      if (!variant || product.id === undefined || variant.id === undefined)
        return;

      const discountedPrice = product.discount
        ? (variant.cost || 0) * (1 - product.discount / 100)
        : (variant.cost || 0);

      cartItems.push({
        productID: product.id,
        variantID: variant.id,
        quantity: count,
        price: discountedPrice,
      });
    });
  });

  return {
    cart: cartItems,
    userID: userId,
    delivery_address: deliveryAddressText || undefined,
  };
};

/**
 * Отправляет заказ на бэкенд.
 */
export const submitOrder = async (
  cart: CartState,
  products: SellerGoApiInternalApientProductResponse[],
  userId: number,
  deliveryAddressText: string | null
): Promise<SellerGoApiInternalApientOrderResponse | null> => {
  try {
    const payload = createOrderPayload(cart, products, userId, deliveryAddressText);

    if ((payload.cart || []).length === 0) {
      console.warn("Cannot submit an empty order.");
      return null;
    }

    const response = await apiClient.orders.ordersCreate(payload);
    console.log("Order submitted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to submit order:", error);
    return null;
  }
};
