import React, { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import { useAppDispatch } from "./store/hooks";
import { fetchProducts } from "./store/productsSlice";
import { fetchCategories } from "./store/categoriesSlice"; // Import fetchCategories

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts(null));
    dispatch(fetchCategories()); // Dispatch fetchCategories
  }, [dispatch]);

  return (
    <UserProvider>
      <Outlet />
    </UserProvider>
  );
};

export default App;
