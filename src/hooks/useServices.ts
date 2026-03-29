import { useMemo } from "react";
import { apiClient } from "@/apiClient";
import { AuthService } from "@/services/AuthService";
import { CategoryService } from "@/services/CategoryService";
import { ProductService } from "@/services/ProductService";
import { CartService } from "@/services/CartService";

// Создаем синглтон-экземпляры сервисов, чтобы состояние сохранялось между рендендерами
const authService = new AuthService(apiClient);
const categoryService = new CategoryService(apiClient);
const productService = new ProductService(apiClient);
const cartService = new CartService();

export const services = {
  auth: authService,
  categories: categoryService,
  products: productService,
  cart: cartService,
};

export const useServices = () => {
  return useMemo(() => services, []);
};
