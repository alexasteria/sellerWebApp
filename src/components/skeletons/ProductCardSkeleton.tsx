import React, { FC } from 'react';
import styles from './ProductCardSkeleton.module.css';

interface ProductCardSkeletonProps {
  count?: number;
}

const ProductCardSkeleton: FC<ProductCardSkeletonProps> = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={styles.skeletonCard}>
          <div className={`${styles.skeletonImage} ${styles.shimmer}`}></div>
          <div className={`${styles.skeletonTitle} ${styles.shimmer}`}></div>
          <div className={`${styles.skeletonDescription} ${styles.shimmer}`}></div>
          <div className={`${styles.skeletonPrice} ${styles.shimmer}`}></div>
          <div className={`${styles.skeletonButton} ${styles.shimmer}`}></div>
        </div>
      ))}
    </>
  );
};

export default ProductCardSkeleton;