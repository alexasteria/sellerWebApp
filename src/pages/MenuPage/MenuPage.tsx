import React, { FC, useState, useMemo } from "react";
import Header from "@/components/common/Header";
import Menu from "@/pages/MenuPage/components/Menu/Menu";
import Footer from "@/components/common/Footer";
import { useCart } from "@/contexts/CartContext";
import { useProducts } from "@/contexts/ProductsContext";

const MenuPage: FC = () => {
  const { cart, total, increment, decrement } = useCart();
  const { products, categories, isLoading } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) {
      return products;
    }
    return products.filter(product => product.category_id === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div className="container">
      <Header />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div style={{ marginBottom: '1rem' }}>
            <button onClick={() => setSelectedCategory(null)}>All</button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{ fontWeight: selectedCategory === category.id ? 'bold' : 'normal' }}
              >
                {category.name}
              </button>
            ))}
          </div>
          <Menu
            products={filteredProducts}
            cart={cart}
            onIncrement={increment}
            onDecrement={decrement}
          />
        </>
      )}
      <Footer total={total} />
    </div>
  );
};

export default MenuPage;
