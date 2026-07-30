import { Api, SellerGoApiInternalApientCategoryResponse } from "@/backendApi";

export class CategoryService {
  constructor(private api: Api<unknown>) {}

  async fetchCategories(): Promise<SellerGoApiInternalApientCategoryResponse[]> {
    try {
      const response = await this.api.categories.categoriesList();
      return response.data.list?.filter((cat): cat is SellerGoApiInternalApientCategoryResponse => !!cat) ?? [];
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      throw error;
    }
  }
}
