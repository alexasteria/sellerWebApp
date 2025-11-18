import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { ModelsProduct } from "@/backendApi";
import { productService } from "@/services/ProductService";
// import { categoryService } from "@/services/CategoryService"; // Categories API is missing

// Hardcoded initial data (can be used for development or as a fallback)
const prod: ModelsProduct[] = [
  // ... (mock data remains the same)
];

interface ProductsContextType {
  products: ModelsProduct[];
  isLoading: boolean;
  error: Error | null;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<ModelsProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const tenantCode = import.meta.env.VITE_TENANT_CODE;

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedProducts = await productService.getProducts();

        if (fetchedProducts.length > 0) {
          setProducts(fetchedProducts);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(err as Error);
        setProducts(prod); // fallback to mock on error
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [tenantCode]);

  const value = useMemo(
    () => ({
      products,
      isLoading,
      error,
    }),
    [products, isLoading, error],
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
