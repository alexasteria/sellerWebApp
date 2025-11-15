import { ModelsProduct } from "@/backendApi";
import { apiClient } from "@/apiClient";

/**
 * Service class for handling product-related operations.
 * This class follows the Singleton pattern to ensure a single instance is used throughout the application.
 */
class ProductService {
  private static instance: ProductService;

  /**
   * Private constructor to prevent direct instantiation.
   */
  private constructor() {}

  /**
   * Returns the singleton instance of the ProductService.
   * @returns The singleton instance.
   */
  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  /**
   * Fetches the list of products for a given tenant.
   * @param tenantId - The ID of the tenant.
   * @returns A promise that resolves to an array of products.
   */
  public async getProducts(tenantId: string): Promise<ModelsProduct[]> {
    try {
      const response = await apiClient.products.productsList({ tenant: tenantId });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch products:", error);
      // In a real-world app, you might want to handle this error more gracefully.
      // For now, we return an empty array.
      return [];
    }
  }
}

// Export a singleton instance of the service
export const productService = ProductService.getInstance();
