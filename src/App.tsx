import React, { FC, useEffect } from "react";
import { UserProvider } from "@/contexts/UserContext";
import Layout from "@/components/Layout/Layout"; // Import Layout
import { useAppDispatch } from "./store/hooks";
import { fetchProducts } from "./store/productsSlice";
import { fetchCategories } from "./store/categoriesSlice"; // Import fetchCategories

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts(null));
    dispatch(fetchCategories()); // Dispatch fetchCategories

    // Automatically expand the Telegram Web App to maximum height
    const tg = (window as any).Telegram?.WebApp;
    if (tg && tg.expand) {
      tg.expand();
    }
  }, [dispatch]);

  return (
    <UserProvider>
      <Layout />
    </UserProvider>
  );
};

export default App;
