import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ModelsProduct } from "@/backendApi";
import { productService } from "@/services/ProductService";

interface ProductsState {
  products: ModelsProduct[];
  isLoading: boolean;
  error: string | null;
  expandedCardId: string | null;
  selectedCategoryId: number | null; // Add selectedCategoryId to state
}

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: null,
  expandedCardId: null,
  selectedCategoryId: null, // Initialize selectedCategoryId
};

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (categoryId: number | null, { rejectWithValue }) => { // Accept categoryId
    try {
      const fetchedProducts = await productService.getProducts(categoryId); // Pass categoryId
      if (fetchedProducts.length > 0) {
        return fetchedProducts;
      } else {
        return [];
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
      return rejectWithValue("Failed to fetch products.");
    }
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setExpandedCardId: (state, action: PayloadAction<string | null>) => {
      state.expandedCardId = action.payload;
    },
    setSelectedCategoryId: (state, action: PayloadAction<number | null>) => {
      state.selectedCategoryId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<ModelsProduct[]>) => {
          state.isLoading = false;
          state.products = action.payload;
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setExpandedCardId, setSelectedCategoryId } = productsSlice.actions; // Export the new action
export default productsSlice.reducer;

// Selector for expandedCardId
export const selectExpandedCardId = (state: { products: ProductsState }) => state.products.expandedCardId;
export const selectSelectedCategoryId = (state: { products: ProductsState }) => state.products.selectedCategoryId;
