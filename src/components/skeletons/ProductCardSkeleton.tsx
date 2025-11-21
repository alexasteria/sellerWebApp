import React from 'react';
import styles from './ProductCardSkeleton.module.css';

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonTitle}></div>
      <div className={styles.skeletonDescription}></div>
      <div className={styles.skeletonPrice}></div>
      <div className={styles.skeletonButton}></div>
    </div>
  );
};

export default ProductCardSkeleton;