import React, { FC } from "react";
import Header from "@/components/common/Header";
import Menu from "@/pages/MenuPage/components/Menu/Menu";
import CategoryFilter from "@/components/CategoryFilter";
import FloatingCart from "@/pages/MenuPage/components/FloatingCart/FloatingCart";

const MenuPage: FC = () => {

  return (
    <div className="container">
      <Header />
      <CategoryFilter />
      <Menu />
      <FloatingCart />
    </div>
  );
};

export default MenuPage;
