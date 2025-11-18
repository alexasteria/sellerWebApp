import React, { FC } from "react";
import { ModelsProduct } from "@/backendApi";
import styles from './CardHeader.module.css';

interface CardHeaderProps {
  item: ModelsProduct;
  isExpanded: boolean;
  totalCount: number;
  discountPrice: number;
  price: number;
  toggleExpand: () => void;
}

const CardHeader: FC<CardHeaderProps> = ({
  item,
  isExpanded,
  totalCount,
  discountPrice,
  price,
  toggleExpand,
}) => {
  return (
    <div className={styles.cardHeader} onClick={toggleExpand}>
      {!isExpanded && (
        <div className={styles.cardImageContainer}>
          {item.img && (
            <div className={styles.cardImage}>
              <img src={item.img} alt={item.title} loading="lazy" />
            </div>
          )}
        </div>
      )}
      <div className={styles.cardInfo}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 className={styles.cardTitle}>{item.title}</h3>
          {Boolean(totalCount) && (
            <span className={styles.badge}>{totalCount}</span>
          )}
        </div>
        {!isExpanded && item.description && (
          <p className={styles.cardDescription}>{item.description}</p>
        )}
        <div className={styles.cardPriceRow}>
          <div className={styles.cardPrice}>
            <span className={styles.discountedPrice}>
              {item.variants?.length > 1 && !isExpanded && "от "}
              {discountPrice.toFixed(2)}₽
            </span>
            {Boolean(item.discount) && (
              <span className={styles.originalPrice}>{price.toFixed(2)}₽</span>
            )}
          </div>
          {Boolean(item.discount) && (
            <div className={styles.cardDiscountBadge}>-{item.discount}%</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardHeader;
