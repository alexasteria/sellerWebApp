import React, { FC } from "react";
import Header from "@/components/common/Header";
import Menu from "@/pages/MenuPage/components/Menu/Menu";
import CategoryFilter from "@/components/CategoryFilter"; // Import CategoryFilter
import Footer from "@/components/common/Footer";

const MenuPage: FC = () => {

  return (
    <div className="container">
      <Header />
      <CategoryFilter /> {/* Render CategoryFilter */}
      <Menu />
      <Footer />
    </div>
  );
};

export default MenuPage;
