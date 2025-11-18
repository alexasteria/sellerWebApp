import React, { FC, useState, useMemo } from "react";
import Header from "@/components/common/Header";
import Menu from "@/pages/MenuPage/components/Menu/Menu";
import Footer from "@/components/common/Footer";
import { useCart } from "@/contexts/CartContext";
import { useProducts } from "@/contexts/ProductsContext";
import { ModelsProduct } from "@/backendApi";

const MenuPage: FC = () => {
  const { cart, total, increment, decrement } = useCart();
  const { products, isLoading, error } = useProducts();

  const filteredProducts = useMemo(() => {
    return products;
  }, [products]);

  if (isLoading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container" style={{ color: "red" }}>Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <Header />
      <Menu
        products={filteredProducts}
        cart={cart}
        onIncrement={increment}
        onDecrement={decrement}
      />
      <Footer total={total} />
    </div>
  );
};

export default MenuPage;
