import { Api, SellerGoApiInternalApientProductResponse } from "@/backendApi";

export class ProductService {
  constructor(private api: Api<unknown>) {}

  async fetchProducts(categoryId: number | null = null): Promise<SellerGoApiInternalApientProductResponse[]> {
    try {
      const response = await this.api.products.productsList({
        category_id: categoryId === null ? undefined : categoryId,
      });
      return response.data.list || [];
    } catch (error) {
      console.error("Failed to fetch products:", error);
      throw error;
    }
  }
}
