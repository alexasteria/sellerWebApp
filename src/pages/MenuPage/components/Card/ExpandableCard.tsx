import React, { FC, useMemo, useState } from "react";
import { Product, VariantState } from "@/types";
import styles from "@/pages/MenuPage/components/Card/ExpandableCard.module.css";
import CardHeader from "@/pages/MenuPage/components/Card/CardHeader";
import CardExpandedContent from "@/pages/MenuPage/components/Card/CardExpandedContent";
import { useExpandedCard } from "@/contexts/ExpandedCardContext";
import { ModelsProduct, ModelsProductVariant } from "@/backendApi.ts";

interface ExpandableCardProps {
  item: ModelsProduct;
  variantState?: VariantState;
  onIncrement: (product: ModelsProduct, variantID: string) => void;
  onDecrement: (product: ModelsProduct, variantID: string) => void;
}

const ExpandableCard: FC<ExpandableCardProps> = ({
  item,
  variantState = {},
  onIncrement,
  onDecrement,
}) => {
  const { expandedCardId, setExpandedCardId } = useExpandedCard();
  const isExpanded = expandedCardId === item.id;
  const [selectVariant, setSelectVariant] = useState<ModelsProductVariant>(item.variants[0]);

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
    if (!selectVariant || !selectVariant.id) return 0;
    return variantState?.[selectVariant.id] || 0;
  }, [selectVariant, variantState]);

  const totalCount = useMemo(() => {
    return Object.entries(variantState).reduce((sum, [_, count]) => {
      return sum + count;
    }, 0);
  }, [variantState]);

  const toggleExpand = () => {
    setExpandedCardId(isExpanded ? null : (item.id || null));
  };

  return (
    <div
      className={`${styles.expandableCard} ${isExpanded ? styles.expanded : ""}`}
    >
      {isExpanded && item.img && (
        <div className={styles.cardExpandedImageContainer}>
          <img src={item.img} alt={item.title} loading="lazy" />
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
