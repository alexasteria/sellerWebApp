import React, { FC, useMemo, useState, useEffect } from "react";
import { VariantState } from "@/types";
import styles from "@/pages/MenuPage/components/Card/ExpandableCard.module.css";
import CardHeader from "@/pages/MenuPage/components/Card/CardHeader";
import CardExpandedContent from "@/pages/MenuPage/components/Card/CardExpandedContent";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectExpandedCardId, setExpandedCardId } from "@/store/productsSlice";
import { ModelsProduct, ModelsProductVariant } from "@/backendApi.ts";

const PLACEHOLDER_IMAGE = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'><rect fill='%23ccc' width='200' height='150'/><text fill='%23555' font-family='sans-serif' font-size='30' dy='10.5' font-weight='bold' x='50%' y='50%' text-anchor='middle'>No Image</text></svg>";

interface ExpandableCardProps {
  item: ModelsProduct;
  variantState?: VariantState;
  onIncrement: (product: ModelsProduct, variantID: number | undefined) => void;
  onDecrement: (product: ModelsProduct, variantID: number | undefined) => void;
}

const ExpandableCard: FC<ExpandableCardProps> = ({
  item,
  variantState = {},
  onIncrement,
  onDecrement,
}) => {
  const dispatch = useAppDispatch();
  const expandedCardId = useAppSelector(selectExpandedCardId);
  const isExpanded = expandedCardId === String(item.id);
  const [selectVariant, setSelectVariant] = useState<ModelsProductVariant>(item.variants[0]);
  const [currentImageSrc, setCurrentImageSrc] = useState<string>(item.img || PLACEHOLDER_IMAGE);

  useEffect(() => {
    setCurrentImageSrc(item.img || PLACEHOLDER_IMAGE);
  }, [item.img]);

  const handleImageError = () => {
    setCurrentImageSrc(PLACEHOLDER_IMAGE);
  };

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
    dispatch(setExpandedCardId(isExpanded ? null : (item.id !== undefined ? String(item.id) : null)));
  };

  return (
    <div
      className={`${styles.expandableCard} ${isExpanded ? styles.expanded : ""}`}
    >
      {isExpanded && (
        <div className={styles.cardExpandedImageContainer}>
          <img
            src={currentImageSrc}
            alt={item.title}
            loading="lazy"
            onError={handleImageError}
          />
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
