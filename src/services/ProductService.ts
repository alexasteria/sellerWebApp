import { Api, ModelsProduct } from "@/backendApi";

export class ProductService {
  constructor(private api: Api<unknown>) {}

  async fetchProducts(categoryId: number | null = null): Promise<ModelsProduct[]> {
    try {
      const response = await this.api.products.productsList({
        category_id: categoryId === null ? undefined : categoryId,
        visible_only: true, // Only show products with stock > 0 and available
      });
      return response.data || [];
    } catch (error) {
      console.error("Failed to fetch products:", error);
      throw error;
    }
  }
}
