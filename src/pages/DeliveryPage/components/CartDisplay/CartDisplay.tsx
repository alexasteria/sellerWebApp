import React, { FC } from 'react';
import { CartState } from '@/types';
import styles from './CartDisplay.module.css';
import { useProducts } from "@/contexts/ProductsContext";

interface CartDisplayProps {
  cart: CartState;
}

const CartDisplay: FC<CartDisplayProps> = ({ cart }) => {
  const { products } = useProducts();

  return (
    <div className={styles.cartDisplayContainer}>
      {Object.entries(cart).map(([productID, variants]) => {
        const item = products.find(p => p.id === productID);
        if (!item) return null; // or some placeholder

        return (
          <div key={productID} className={styles.cartItem}>
            <img src={item.img} alt={item.title} className={styles.cartItemImage} />
            <div className={styles.cartItemDetails}>
              <div className={styles.cartItemTitle}>{item.title}</div>
              <div className={styles.cartItemVariants}>
                {Object.entries(variants).map(([variantID, count]) => {
                  const v = item.variants.find((v) => v.id === variantID);
                  if (!v) return null; // or some placeholder

                  return (
                    <div key={variantID} className={styles.variantBadge}>
                      {v.value} x {count}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartDisplay;
