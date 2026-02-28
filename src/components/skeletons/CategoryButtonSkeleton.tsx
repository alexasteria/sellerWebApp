import React, { FC } from 'react';
import styles from './CategoryButtonSkeleton.module.css';

interface CategoryButtonSkeletonProps {
  count?: number;
}

const CategoryButtonSkeleton: FC<CategoryButtonSkeletonProps> = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={`${styles.skeletonButton} ${styles.shimmer}`}></div>
      ))}
    </>
  );
};

export default CategoryButtonSkeleton;