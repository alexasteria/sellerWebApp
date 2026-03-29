import React, { FC, useMemo, useState, useEffect } from "react";
import { VariantState } from "@/types";
import styles from "@/pages/MenuPage/components/Card/ExpandableCard.module.css";
import CardHeader from "@/pages/MenuPage/components/Card/CardHeader";
import CardExpandedContent from "@/pages/MenuPage/components/Card/CardExpandedContent";
import { useProducts } from "@/contexts/ProductContext";
import { useCart } from "@/contexts/CartContext";
import { ModelsProduct, ModelsProductVariant } from "@/backendApi.ts";
import { getImageUrl } from '@/utils/getImageUrl';

const ExpandableCard: FC<ExpandableCardProps> = ({
  item,
  variantState = {},
  onIncrement,
  onDecrement,
}) => {
  const { expandedCardId, setExpandedCardId } = useProducts();
  const { cart } = useCart();
  const isExpanded = expandedCardId === String(item.id);
  const [selectVariant, setSelectVariant] = useState<ModelsProductVariant>(item.variants[0]);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [item.img]);

  const hasImage = !!item.img && !imgError;

  const price = useMemo(() => {
    if (!selectVariant) throw Error("не выбра вариант");
    return selectVariant.cost;
  }, [selectVariant]);

  const discountPrice = useMemo(() => {
    if (!item.discount) return price;
    const calculatedPrice = price * (1 - item.discount / 100);
    return parseFloat(calculatedPrice.toFixed(2));
  }, [price]);

  const quantity = useMemo(() => {
    if (!selectVariant || selectVariant.id === undefined) return 0;
    return variantState?.[String(selectVariant.id)] || 0;
  }, [selectVariant, variantState]);

  const totalCount = useMemo(() => {
    return Object.entries(variantState).reduce((sum, [_, count]) => {
      return sum + count;
    }, 0);
  }, [variantState]);

  const toggleExpand = () => {
    setExpandedCardId(isExpanded ? null : (item.id !== undefined ? String(item.id) : null));
  };

  return (
    <div
      className={`${styles.expandableCard} ${isExpanded ? styles.expanded : ""}`}
    >
      {isExpanded && (
        <div className={styles.cardExpandedImageContainer}>
          {hasImage ? (
            <img
              src={getImageUrl(item.img)}
              alt={item.title}
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 200 150">
                <rect fill="var(--app-bg)" width="100%" height="100%"/>
                <text fill="var(--app-text-muted)" fontFamily="sans-serif" fontSize="16" fontWeight="500" x="50%" y="50%" textAnchor="middle">Нет фото</text>
              </svg>
            </div>
          )}
        </div>
      )}

      <CardHeader
        item={item}
        isExpanded={isExpanded}
        totalCount={totalCount}
        discountPrice={discountPrice}
        price={price}
        toggleExpand={toggleExpand}
      />

      {isExpanded && (
        <CardExpandedContent
          item={item}
          variantState={variantState}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          selectVariant={selectVariant}
          setSelectVariant={setSelectVariant}
          quantity={quantity}
          discountPrice={discountPrice}
          isExpanded={isExpanded}
        />
      )}
    </div>
  );
};

export default ExpandableCard;
