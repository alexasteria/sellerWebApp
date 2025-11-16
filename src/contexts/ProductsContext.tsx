import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { useParams } from "react-router-dom";
import { ModelsProduct, ModelsCategory } from "@/backendApi";
import { productService } from "@/services/ProductService";
import { categoryService } from "@/services/CategoryService";

// Hardcoded initial data (can be used for development or as a fallback)
const prod: ModelsProduct[] = [
  // ... (mock data remains the same)
];

interface ProductsContextType {
  products: ModelsProduct[];
  categories: ModelsCategory[];
  isLoading: boolean;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<ModelsProduct[]>([]);
  const [categories, setCategories] = useState<ModelsCategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { tenantId } = useParams<{ tenantId: string }>();

  useEffect(() => {
    const loadData = async () => {
      if (!tenantId) {
        setIsLoading(false);
        setProducts(prod); // fallback to mock
        setCategories([]);
        return;
      }

      setIsLoading(true);
      try {
        const [fetchedProducts, fetchedCategories] = await Promise.all([
          productService.getProducts(tenantId),
          categoryService.getCategories(tenantId),
        ]);

        if (fetchedProducts.length > 0) {
          setProducts(fetchedProducts);
        } else {
          setProducts([]);
        }

        if (fetchedCategories.length > 0) {
          setCategories(fetchedCategories);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setProducts(prod); // fallback to mock on error
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [tenantId]);

  const value = useMemo(
    () => ({
      products,
      categories,
      isLoading,
    }),
    [products, categories, isLoading],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}
