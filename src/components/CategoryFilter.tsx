import React, { FC } from "react";
import styles from "./CategoryFilter.module.css";
import { ModelsCategory } from "@/backendApi";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectSelectedCategoryId, setSelectedCategoryId, fetchProducts } from "@/store/productsSlice";
import { selectCategories, selectCategoriesLoading, selectCategoriesError } from "@/store/categoriesSlice";
import CategoryButtonSkeleton from "@/components/skeletons/CategoryButtonSkeleton"; // Import skeleton

const CategoryFilter: FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const isLoading = useAppSelector(selectCategoriesLoading);
  const error = useAppSelector(selectCategoriesError);
  const selectedCategoryId = useAppSelector(selectSelectedCategoryId);

  const handleSelectCategory = (categoryId: number | null) => {
    dispatch(setSelectedCategoryId(categoryId));
    dispatch(fetchProducts(categoryId));
  };

  if (isLoading) {
    return (
      <div className={styles.filterContainer}>
        {[...Array(4)].map((_, index) => ( // Render 4 skeleton buttons
          <CategoryButtonSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.filterContainer} style={{ color: "red" }}>
        Error loading categories: {error}
      </div>
    );
  }

  return (
    <div className={styles.filterContainer}>
      <button
        className={`${styles.filterButton} ${
          selectedCategoryId === null ? styles.active : ""
        }`}
        onClick={() => handleSelectCategory(null)}
      >
        Все
      </button>
      {categories.map((category: ModelsCategory) => (
        <button
          key={category.id}
          className={`${styles.filterButton} ${
            selectedCategoryId === (category.id ?? null) ? styles.active : ""
          }`}
          onClick={() => handleSelectCategory(category.id ?? null)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;