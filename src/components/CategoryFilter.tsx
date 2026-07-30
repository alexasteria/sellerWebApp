import React, { FC } from "react";
import { motion } from "framer-motion";
import styles from "./CategoryFilter.module.css";
import { SellerGoApiInternalApientCategoryResponse } from "@/backendApi";
import { useCategories } from "@/contexts/CategoryContext";
import { useProducts } from "@/contexts/ProductContext";
import { Skeleton } from "@/components/UiKit";
import { triggerSelection } from "@/hooks/useTelegram";

const CategoryFilter: FC = () => {
  const { categories, isLoading, error } = useCategories();
  const { selectedCategoryId, setSelectedCategoryId, fetchProducts } = useProducts();

  const handleSelectCategory = (categoryId: number | null) => {
    triggerSelection();
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
    <motion.div 
      className={styles.filterContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
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

        {categories.map((category: SellerGoApiInternalApientCategoryResponse) => {
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
    </motion.div>
  );
};

export default CategoryFilter;