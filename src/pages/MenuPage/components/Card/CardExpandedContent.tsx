import React, { FC } from "react";
import { ModelsProduct, ModelsProductVariant } from "@/backendApi";
import { VariantState } from "@/types";
import ProductVariants from "@/pages/MenuPage/components/Card/components/ProductVariants";
import styles from "@/pages/MenuPage/components/Card/CardExpandedContent.module.css";

interface CardExpandedContentProps {
  item: ModelsProduct;
  variantState: VariantState;
  onIncrement: (product: ModelsProduct, variantID: string) => void;
  onDecrement: (product: ModelsProduct, variantID: string) => void;
  selectVariant: ModelsProductVariant;
  setSelectVariant: (v: ModelsProductVariant) => void;
  quantity: number;
  discountPrice: number;
  isExpanded: boolean;
}

const CardExpandedContent: FC<CardExpandedContentProps> = ({
  item,
  variantState,
  onIncrement,
  onDecrement,
  selectVariant,
  setSelectVariant,
  quantity,
  discountPrice,
  isExpanded,
}) => {
  return (
    <div
      className={`${styles.cardExpandedContent}`}
      style={{ maxHeight: `${!isExpanded ? 0 : "max-content"}` }}
    >
      {item.description && (
        <p className={styles.cardExpandedDescription}>{item.description}</p>
      )}

      {!!item.tags && (
        (Array.isArray(item.tags) ? item.tags : [item.tags]).map((group, idx) => {
          if (!group || !group.tags?.length) return null;
          const groupKey = ("id" in group && group.id) || `${group.name}-${idx}`;
          return (
            <div key={groupKey} className={styles.cardExpandedIngredients}>
              <div className={styles.ingredientsTitle}>{group.name}:</div>
              <div className={styles.ingredientsList}>
                {group.tags.map((value: string, index: number) => (
                  <span key={`${groupKey}-${index}`} className={styles.ingredientItem}>
                    {value}
                  </span>
                ))}
              </div>
            </div>
          );
        })
      )}

      {selectVariant && (
        <ProductVariants
          variants={item.variants}
          setSelectVariant={setSelectVariant}
          selected={selectVariant?.id}
          variantState={variantState}
        />
      )}

      <div className={styles.cardExpandedActions}>
        {quantity > 0 ? (
          <div className={styles.cardExpandedCounter}>
            <button
              className={styles.cardExpandedBtn}
              onClick={(e) => {
                e.stopPropagation();
                onDecrement(item, selectVariant.id!);
              }}
              aria-label="Уменьшить количество"
            >
              −
            </button>
            <span className={styles.cardExpandedQty}>{quantity}</span>
            <button
              className={styles.cardExpandedBtn}
              onClick={(e) => {
                e.stopPropagation();
                onIncrement(item, selectVariant.id!);
              }}
              aria-label="Увеличить количество"
            >
              +
            </button>
          </div>
        ) : (
          <button
            className={styles.cardExpandedAddBtn}
            onClick={(e) => {
              e.stopPropagation();
              onIncrement(item, selectVariant.id!);
            }}
            aria-label={`Добавить ${item.title}`}
          >
            <span className={styles.btnText}>В корзину за</span>
            <span className={styles.btnText}>{discountPrice} ₽</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default CardExpandedContent;
