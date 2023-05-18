import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./App.scss";
import CartPage from "@pages/CartPage";
import HomePage from "@pages/HomePage";
import NotFoundPage from "@pages/NotFoundPage";
import ProductItemPage from "@pages/ProductItemPage";
import ProductsListPage from "@pages/ProductsListPage";
import { useEffect } from "react";
import { AppDispatch } from "./store";
import { getAllProducts } from "@store/products/actions";

function App() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div className="app__container">
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/products"
          element={<ProductsListPage />}
        />
        <Route
          path="/products/:id"
          element={<ProductItemPage />}
        />
        <Route
          path="/cart"
          element={<CartPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
