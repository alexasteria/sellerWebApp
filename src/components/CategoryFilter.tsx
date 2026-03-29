import React, { FC } from "react";
import { motion } from "framer-motion";
import styles from "./CategoryFilter.module.css";
import { ModelsCategory } from "@/backendApi";
import { useCategories } from "@/contexts/CategoryContext";
import { useProducts } from "@/contexts/ProductContext";
import { Skeleton } from "@/components/UiKit";

const CategoryFilter: FC = () => {
  const { categories, isLoading, error } = useCategories();
  const { selectedCategoryId, setSelectedCategoryId, fetchProducts } = useProducts();

  const handleSelectCategory = (categoryId: number | null) => {
    setSelectedCategoryId(categoryId);
    fetchProducts(categoryId);
  };

  if (isLoading) {
    return (
      <div className={styles.filterContainer}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Skeleton count={4} type="card" width="100px" height="38px" className={styles.skeletonPill} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.filterContainer} style={{ color: "red", padding: "16px" }}>
        Error loading categories
      </div>
    );
  }

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterScroll}>
        <button
          className={`${styles.filterButton} ${selectedCategoryId === null ? styles.activeText : ""}`}
          onClick={() => handleSelectCategory(null)}
        >
          {selectedCategoryId === null && (
            <motion.div layoutId="activeCategory" className={styles.activeBackground} transition={{ type: "spring", stiffness: 400, damping: 30 }} />
          )}
          <span className={styles.buttonText}>Все</span>
        </button>

        {categories.map((category: ModelsCategory) => {
          const isActive = selectedCategoryId === (category.id ?? null);
          return (
            <button
              key={category.id}
              className={`${styles.filterButton} ${isActive ? styles.activeText : ""}`}
              onClick={() => handleSelectCategory(category.id ?? null)}
            >
              {isActive && (
                <motion.div layoutId="activeCategory" className={styles.activeBackground} transition={{ type: "spring", stiffness: 400, damping: 30 }} />
              )}
              <span className={styles.buttonText}>{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;