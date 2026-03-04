import React, { FC, useState } from "react";
import ProductCard from "@/pages/MenuPage/components/Menu/ProductCard";
import ProductDetailsSheet from "@/pages/MenuPage/components/Menu/ProductDetailsSheet";
import styles from "@/pages/MenuPage/components/Menu/Menu.module.css";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { increment as cartIncrement, decrement as cartDecrement, selectCart } from "@/store/cartSlice";
import { ModelsProduct } from "@/backendApi.ts";
import { Skeleton } from "@/components/UiKit";

const Menu: FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const productsLoading = useAppSelector((state) => state.products.isLoading);
  const cart = useAppSelector(selectCart);

  const [selectedProduct, setSelectedProduct] = useState<ModelsProduct | null>(null);

  const handleIncrement = (product: ModelsProduct, variantID: number | undefined) => {
    dispatch(cartIncrement({ product, variantID }));
  };

  const handleDecrement = (product: ModelsProduct, variantID: number | undefined) => {
    dispatch(cartDecrement({ product, variantID }));
  };

  const getProductTotalQuantity = (productId: number | undefined): number => {
    if (!productId || !cart[productId]) return 0;
    const variantsForProduct = cart[productId];
    return Object.values(variantsForProduct).reduce((sum, qty) => sum + qty, 0);
  };

  if (productsLoading && products.length === 0) {
    return (
      <section className={styles.grid}>
        <Skeleton count={6} />
      </section>
    );
  }

  return (
    <>
      <section
        className={styles.grid}
        style={{ opacity: productsLoading ? 0.5 : 1, transition: 'opacity 0.2s ease-in-out', pointerEvents: productsLoading ? 'none' : 'auto' }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => setSelectedProduct(product)}
            totalQuantity={getProductTotalQuantity(product.id)}
            onIncrement={() => {
              if (product.variants && product.variants.length > 1) {
                setSelectedProduct(product);
              } else {
                handleIncrement(product, product.variants?.[0]?.id);
              }
            }}
            onDecrement={() => {
              if (product.variants && product.variants.length > 1) {
                setSelectedProduct(product);
              } else {
                handleDecrement(product, product.variants?.[0]?.id);
              }
            }}
          />
        ))}
      </section>

      <ProductDetailsSheet
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        variantState={selectedProduct?.id ? cart[selectedProduct.id] || {} : {}}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
    </>
  );
};

export default Menu;
