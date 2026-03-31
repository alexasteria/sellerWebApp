import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { ModelsProduct } from "@/backendApi";
import { useServices } from "@/hooks/useServices";

interface ProductContextType {
  products: ModelsProduct[];
  isLoading: boolean;
  error: string | null;
  expandedCardId: string | null;
  selectedCategoryId: number | null;
  fetchProducts: (categoryId?: number | null) => Promise<void>;
  setExpandedCardId: (id: string | null) => void;
  setSelectedCategoryId: (id: number | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { products: productService } = useServices();
  const [products, setProducts] = useState<ModelsProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = useCallback(async (categoryId: number | null = null) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await productService.fetchProducts(categoryId);
      setProducts(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to fetch products");
      }
    } finally {
      setIsLoading(false);
    }
  }, [productService]);

  return (
    <ProductContext.Provider value={{
      products, isLoading, error, expandedCardId, selectedCategoryId, 
      fetchProducts, setExpandedCardId, setSelectedCategoryId,
      searchQuery, setSearchQuery
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within a ProductProvider");
  return context;
};
