import React, { FC, useState } from "react";
import ProductCard from "@/pages/MenuPage/components/Menu/ProductCard";
import ProductDetailsSheet from "@/pages/MenuPage/components/Menu/ProductDetailsSheet";
import styles from "@/pages/MenuPage/components/Menu/Menu.module.css";
import { SellerGoApiInternalApientProductResponse } from "@/backendApi.ts";
import { Skeleton } from "@/components/UiKit";
import { useProducts } from "@/contexts/ProductContext";
import { useCart } from "@/contexts/CartContext";

const Menu: FC = () => {
  const { products, isLoading: productsLoading, searchQuery } = useProducts();
  const { cart, increment, decrement } = useCart();

  const [selectedProduct, setSelectedProduct] = useState<SellerGoApiInternalApientProductResponse | null>(null);

  const handleIncrement = (product: SellerGoApiInternalApientProductResponse, variantID: number | undefined) => {
    increment(product, variantID);
  };

  const handleDecrement = (product: SellerGoApiInternalApientProductResponse, variantID: number | undefined) => {
    decrement(product, variantID);
  };

  const getProductTotalQuantity = (productId: number | undefined): number => {
    if (!productId || !cart[productId]) return 0;
    const variantsForProduct = cart[productId];
    return Object.values(variantsForProduct).reduce((sum, qty) => (sum as number) + (qty as number), 0);
  };

  const filteredProducts = products.filter(product => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const titleMatch = product.title?.toLowerCase().includes(q);
    const descMatch = product.description?.toLowerCase().includes(q);
    return titleMatch || descMatch;
  });

  if (productsLoading && products.length === 0) {
    return (
      <section className={styles.grid}>
        <Skeleton count={6} />
      </section>
    );
  }

  return (
    <>
      {filteredProducts.length === 0 && !productsLoading && products.length > 0 ? (
        <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--app-text-muted)" }}>
          <p>По вашему запросу ничего не найдено</p>
        </div>
      ) : (
        <section
          className={styles.grid}
          style={{ opacity: productsLoading ? 0.5 : 1, transition: 'opacity 0.2s ease-in-out', pointerEvents: productsLoading ? 'none' : 'auto' }}
        >
          {filteredProducts.map((product) => (
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
      )}

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
