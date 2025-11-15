import {
  ModelsCreateOrderRequest,
  ModelsOrder,
  ModelsProduct,
} from "@/backendApi";
import { apiClient } from "@/apiClient";
import { CartState } from "@/types";
import { WebAppUser } from "telegram-web-app";
import { userService } from "./UserService";

/**
 * Service class for handling order-related operations.
 * Follows the Singleton pattern.
 */
class OrderService {
  private static instance: OrderService;

  private constructor() {}

  public static getInstance(): OrderService {
    if (!OrderService.instance) {
      OrderService.instance = new OrderService();
    }
    return OrderService.instance;
  }

  /**
   * Creates the payload for the 'create order' API request from the cart state.
   * @param cart - The current cart state.
   * @param products - The list of all available products.
   * @param user - The authenticated user.
   * @returns The formatted request payload.
   */
  private createOrderPayload(
    cart: CartState,
    products: ModelsProduct[],
    user: WebAppUser
  ): ModelsCreateOrderRequest {
    const cartItems: ModelsCreateOrderRequest["cart"] = [];

    Object.entries(cart).forEach(([productId, variantState]) => {
      const product = products.find((p) => p.id === productId);
      if (!product) return;

      Object.entries(variantState).forEach(([variantId, count]) => {
        if (count <= 0) return;
        const variant = product.variants?.find((v) => v.id === variantId);
        if (!variant) return;

        const discountedPrice = product.discount
          ? variant.cost * (1 - product.discount / 100)
          : variant.cost;

        cartItems.push({
          productID: product.id,
          variantID: variant.id,
          quantity: count,
          price: discountedPrice, // Assuming the backend wants the final price per item
        });
      });
    });

    if (!user.id) {
        throw new Error("User ID is missing, cannot create order.");
    }

    return {
      userID: user.id,
      cart: cartItems,
    };
  }

  /**
   * Submits the order to the backend.
   * @param cart - The current cart state.
   * @param products - The list of all available products.
   * @param user - The authenticated user.
   * @returns A promise that resolves to the created order or null on failure.
   */
  public async submitOrder(
    cart: CartState,
    products: ModelsProduct[],
    user: WebAppUser
  ): Promise<ModelsOrder | null> {
    try {
      const payload = this.createOrderPayload(cart, products, user);
      const tenantId = userService.getTenantId(user);
      
      if (payload.cart.length === 0) {
        console.warn("Cannot submit an empty order.");
        return null;
      }

      const response = await apiClient.orders.ordersCreate(
        { tenant: tenantId },
        payload
      );
      
      console.log("Order submitted successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to submit order:", error);
      return null;
    }
  }
}

export const orderService = OrderService.getInstance();
