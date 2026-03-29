import { Api, ModelsCategory } from "@/backendApi";

export class CategoryService {
  constructor(private api: Api<unknown>) {}

  async fetchCategories(): Promise<ModelsCategory[]> {
    try {
      const response = await this.api.categories.categoriesList();
      return response.data?.filter((cat): cat is ModelsCategory => !!cat) ?? [];
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      throw error;
    }
  }
}
