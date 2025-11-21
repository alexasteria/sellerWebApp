import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ModelsCategory } from "@/backendApi";
import { Api } from "@/backendApi"; // Import Api class
import axios from "axios"; // Import axios

// Re-create the apiClient here for the thunk, or export it from useApiClient if reusable
const createApiClient = () => {
  const apiClient = new Api({
    baseURL: import.meta.env.VITE_API_BASE_URL || "//localhost:8080",
  });

  apiClient.instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const tenantCode = import.meta.env.VITE_TENANT_CODE;
    if (tenantCode) {
      config.headers["Tenant-Code"] = tenantCode;
    }
    return config;
  });

  return apiClient;
};

const apiClient = createApiClient(); // Create a singleton instance for the thunk

interface CategoriesState {
  categories: ModelsCategory[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.categories.categoriesList();
      if (response.data) {
        return response.data.filter((cat: ModelsCategory): cat is ModelsCategory => !!cat);
      } else {
        return [];
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      // Fallback to mock data on error (if any) or just reject
      return rejectWithValue("Failed to fetch categories.");
    }
  },
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<ModelsCategory[]>) => {
          state.isLoading = false;
          state.categories = action.payload;
        },
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.categories = []; // Clear categories on rejection
      });
  },
});

export default categoriesSlice.reducer;

// Selectors
export const selectCategories = (state: { categories: CategoriesState }) => state.categories.categories;
export const selectCategoriesLoading = (state: { categories: CategoriesState }) => state.categories.isLoading;
export const selectCategoriesError = (state: { categories: CategoriesState }) => state.categories.error;
