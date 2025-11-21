import React from 'react';
import styles from './CategoryButtonSkeleton.module.css';

const CategoryButtonSkeleton: React.FC = () => {
  return (
    <div className={styles.skeletonButton}></div>
  );
};

export default CategoryButtonSkeleton;