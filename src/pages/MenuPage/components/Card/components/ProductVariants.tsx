import React, { FC } from "react";
import { ModelsProductVariant } from "@/backendApi";
import { VariantState } from "@/types";
import styles from '@/pages/MenuPage/components/Card/components/ProductVariants.module.css';

const ProductVariants: FC<{
  variants?: ModelsProductVariant[];
  setSelectVariant: (v: ModelsProductVariant) => void;
  selected?: number;
  variantState?: VariantState;
}> = ({ variants, setSelectVariant, selected, variantState = {} }) => {
  return (
    <div className={styles.variantsContainer}>
      {variants?.map((variant) => {
        const isSelected = selected === variant.id;
        return (
          <div
            className={`${styles.variantItem} ${isSelected ? styles.selected : ''}`}
            onClick={() => setSelectVariant(variant)}
            key={variant.value}
          >
            {variant.value}
            {variant.id && Boolean(variantState[String(variant.id)]) && (
              <span className={styles.count}>
                {variantState[String(variant.id)]}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductVariants;