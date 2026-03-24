import React, { FC } from 'react';
import { CartState } from '@/types';
import styles from './CartDisplay.module.css';
import { useAppSelector } from "@/store/hooks";
import { ModelsProduct, ModelsProductVariant } from "@/backendApi";
import { Card } from '@/components/UiKit';

interface CartDisplayProps {
  cart: CartState;
}

const PLACEHOLDER_IMAGE = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect fill='%23f2f2f7' width='100' height='100'/></svg>";

const CartDisplay: FC<CartDisplayProps> = ({ cart }) => {
  const { products } = useAppSelector((state) => state.products);

  const hasItems = Object.keys(cart).length > 0;

  if (!hasItems) {
    return (
      <div className={styles.cartDisplayContainer}>
        <div style={{ textAlign: 'center', margin: '40px 0', color: 'var(--app-text-muted)' }}>
          Корзина пуста
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartDisplayContainer}>
      <h3 className={styles.sectionTitle}>Ваш заказ</h3>
      <div className={styles.cartList}>
        {Object.entries(cart).map(([productIDStr, variants]) => {
          const productID = Number(productIDStr);
          const item = products.find((p: ModelsProduct) => p.id === productID);
          if (!item) return null;

          return (
            <Card key={productID} className={styles.cartItem} padding="sm">
              <div className={styles.imageWrapper}>
                <img
                  src={item.img || PLACEHOLDER_IMAGE}
                  alt={item.title}
                  onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE; }}
                />
              </div>
              <div className={styles.itemInfo}>
                <div className={styles.itemTitle}>{item.title}</div>
                <div className={styles.variantList}>
                  {Object.entries(variants).map(([variantIDStr, count]) => {
                    const variantID = Number(variantIDStr);
                    const v = item.variants?.find((v: ModelsProductVariant) => v.id === variantID);
                    if (!v || count === 0) return null;

                    return (
                      <div key={variantID} className={styles.variantRow}>
                        <span className={styles.variantName}>{v.value}</span>
                        <div className={styles.variantMeta}>
                          <span className={styles.variantCount}>{count} шт</span>
                          <span className={styles.variantPrice}>{(v.cost * count).toFixed(2)}₽</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CartDisplay;
