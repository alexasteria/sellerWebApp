import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { ModelsCategory } from "@/backendApi";
import { useServices } from "@/hooks/useServices";

interface CategoryContextType {
  categories: ModelsCategory[];
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { categories: categoryService } = useServices();
  const [categories, setCategories] = useState<ModelsCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await categoryService.fetchCategories();
      setCategories(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to fetch categories");
      }
    } finally {
      setIsLoading(false);
    }
  }, [categoryService]);

  // Optionally auto-fetch on mount, but let's do it manually or inside as before in App.tsx
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <CategoryContext.Provider value={{ categories, isLoading, error, fetchCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) throw new Error("useCategories must be used within a CategoryProvider");
  return context;
};
