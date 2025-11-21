import {
  ModelsCreateOrderRequest,
  ModelsOrder,
  ModelsProduct,
} from "@/backendApi";
import { apiClient } from "@/apiClient";
import { CartState, DeliveryInfo } from "@/types"; // Import DeliveryInfo
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
   * @param deliveryInfo - The delivery information.
   * @returns The formatted request payload.
   */
  private createOrderPayload(
    cart: CartState,
    products: ModelsProduct[],
    user: WebAppUser,
    deliveryInfo: DeliveryInfo | null, // Added deliveryInfo
  ): ModelsCreateOrderRequest {
    const cartItems: ModelsCreateOrderRequest["cart"] = [];

    Object.entries(cart).forEach(([productIdStr, variantState]) => {
      const productId = Number(productIdStr); // Convert string key to number
      const product = products.find((p) => p.id === productId);
      if (!product) {
        console.warn(`Product with ID ${productId} not found.`);
        return;
      }

      Object.entries(variantState).forEach(([variantIdStr, count]) => {
        if (count <= 0) return;
        const variantId = Number(variantIdStr); // Convert string key to number
        const variant = product.variants?.find((v) => v.id === variantId);
        if (!variant) {
          console.warn(`Variant with ID ${variantId} not found for product ${product.id}.`);
          return;
        }

        console.log(`Product ID: ${product.id}, Variant ID: ${variant.id}`);

        const discountedPrice = product.discount
          ? variant.cost * (1 - product.discount / 100)
          : variant.cost;

        // Ensure product.id and variant.id are not undefined before pushing
        if (product.id === undefined || variant.id === undefined) {
            console.error(`Attempted to add cart item with undefined product.id (${product.id}) or variant.id (${variant.id})`);
            return;
        }

        cartItems.push({
          productID: product.id,
          variantID: variant.id,
          quantity: count,
          price: discountedPrice,
        });
      });
    });

    if (!user.id) {
        throw new Error("User ID is missing, cannot create order.");
    }
    
    // Delivery information is not directly part of ModelsCreateOrderRequest based on backendApi.ts
    // It should be handled by updating the user profile separately if needed.
    if (deliveryInfo) {
        console.warn("Delivery information provided but ModelsCreateOrderRequest does not support it directly. Consider updating user profile separately.");
    }

    return {
      cart: cartItems,
      userID: user.id, // Added userID as per ModelsCreateOrderRequest
    };
  }

  /**
   * Submits the order to the backend.
   * @param cart - The current cart state.
   * @param products - The list of all available products.
   * @param user - The authenticated user.
   * @param deliveryInfo - The delivery information.
   * @returns A promise that resolves to the created order or null on failure.
   */
  public async submitOrder(
    cart: CartState,
    products: ModelsProduct[],
    user: WebAppUser,
    deliveryInfo: DeliveryInfo | null, // Added deliveryInfo
  ): Promise<ModelsOrder | null> {
    try {
      const payload = this.createOrderPayload(cart, products, user, deliveryInfo); // Pass deliveryInfo
      
      if (payload.cart.length === 0) {
        console.warn("Cannot submit an empty order.");
        return null;
      }

      const response = await apiClient.orders.ordersCreate(
        payload,
        {
          headers: {
            "Tenant-Code": import.meta.env.VITE_TENANT_CODE,
          },
        }
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
