import React, { FC } from 'react';
import { CartState } from '@/types';
import styles from './CartDisplay.module.css';
import { useAppSelector } from "@/store/hooks";
import { ModelsProduct, ModelsProductVariant } from "@/backendApi";

interface CartDisplayProps {
  cart: CartState;
}

const CartDisplay: FC<CartDisplayProps> = ({ cart }) => {
  const { products } = useAppSelector((state) => state.products);

  return (
    <div className={styles.cartDisplayContainer}>
      {Object.entries(cart).map(([productIDStr, variants]) => {
        const productID = Number(productIDStr); // Convert to number
        const item = products.find((p: ModelsProduct) => p.id === productID);
        if (!item) return null; // or some placeholder

        return (
          <div key={productID} className={styles.cartItem}>
            <img src={item.img} alt={item.title} className={styles.cartItemImage} />
            <div className={styles.cartItemDetails}>
              <div className={styles.cartItemTitle}>{item.title}</div>
              <div className={styles.cartItemVariants}>
                {Object.entries(variants).map(([variantIDStr, count]) => {
                  const variantID = Number(variantIDStr); // Convert to number
                  const v = item.variants?.find((v: ModelsProductVariant) => v.id === variantID);
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
