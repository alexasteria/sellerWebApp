import React, { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { CategoryProvider } from "./CategoryContext";
import { ProductProvider } from "./ProductContext";
import { CartProvider } from "./CartContext";
import { TenantProvider } from "./TenantContext";

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <TenantProvider>
      <AuthProvider>
      <CategoryProvider>
        <ProductProvider>
          {/* CartProvider needs access to ProductProvider specifically for cartTotal computation */}
          <CartProvider>
            {children}
          </CartProvider>
        </ProductProvider>
      </CategoryProvider>
    </AuthProvider>
    </TenantProvider>
  );
};
