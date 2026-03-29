import React, { FC, useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useProducts } from "@/contexts/ProductContext";
import { useCategories } from "@/contexts/CategoryContext";

const App: FC = () => {
  const { authenticateTelegram } = useAuth();
  const { fetchProducts } = useProducts();
  const { fetchCategories } = useCategories();

  useEffect(() => {
    // Аутентификация через Telegram WebApp
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user) {
      authenticateTelegram(tg.initDataUnsafe.user);
    }

    // Автоматически раскрываем на полный экран
    if (tg?.expand) {
      tg.expand();
    }

    // Загрузка данных
    fetchProducts(null);
    fetchCategories();
  }, [authenticateTelegram, fetchProducts, fetchCategories]);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (!tg) return;

    const applyTheme = () => {
      document.documentElement.setAttribute('data-theme', tg.colorScheme);
    };
    
    applyTheme();
    tg.onEvent('themeChanged', applyTheme);
    
    return () => {
      tg.offEvent('themeChanged', applyTheme);
    };
  }, []);

  return <Layout />;
};

export default App;
