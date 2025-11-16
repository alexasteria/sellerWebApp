import { apiClient, ModelsCategory } from "@/backendApi";

/**
 * Service class for handling category-related operations.
 * Follows the Singleton pattern.
 */
class CategoryService {
  private static instance: CategoryService;

  private constructor() {}

  public static getInstance(): CategoryService {
    if (!CategoryService.instance) {
      CategoryService.instance = new CategoryService();
    }
    return CategoryService.instance;
  }

  /**
   * Fetches a list of categories for a given tenant.
   * @param tenantId - The ID of the tenant.
   * @returns A promise that resolves to an array of categories.
   */
  public async getCategories(tenantId: string): Promise<ModelsCategory[]> {
    try {
      const response = await apiClient.categories.categoriesList({ tenant: tenantId });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      return [];
    }
  }
}

export const categoryService = CategoryService.getInstance();
