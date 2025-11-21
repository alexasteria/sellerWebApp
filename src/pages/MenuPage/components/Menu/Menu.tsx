import React, { FC } from "react";
import ExpandableCard from "@/pages/MenuPage/components/Card/ExpandableCard";
import styles from "@/pages/MenuPage/components/Menu/Menu.module.css";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { increment as cartIncrement, decrement as cartDecrement, selectCart } from "@/store/cartSlice";
import { ModelsProduct } from "@/backendApi.ts";
import ProductCardSkeleton from "@/components/skeletons/ProductCardSkeleton"; // Import skeleton

const Menu: FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const productsLoading = useAppSelector((state) => state.products.isLoading); // Get products loading state
  const cart = useAppSelector(selectCart);

  const handleIncrement = (product: ModelsProduct, variantID: number | undefined) => {
    dispatch(cartIncrement({ product, variantID }));
  };

  const handleDecrement = (product: ModelsProduct, variantID: number | undefined) => {
    dispatch(cartDecrement({ product, variantID }));
  };

  if (productsLoading) {
    return (
      <section className={styles.grid}>
        {[...Array(6)].map((_, index) => ( // Render 6 skeleton cards
          <ProductCardSkeleton key={index} />
        ))}
      </section>
    );
  }

  return (
    <section className={styles.grid}>
      {products.map((item) => (
        <ExpandableCard
          key={item.id}
          item={item}
          variantState={item.id ? cart[item.id] : undefined}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      ))}
    </section>
  );
};

export default Menu;
