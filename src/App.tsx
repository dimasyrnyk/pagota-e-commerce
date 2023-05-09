import { Route, Routes } from "react-router-dom";

import "./App.scss";
import CartPage from "@pages/CartPage";
import HomePage from "@pages/HomePage";
import NotFoundPage from "@pages/NotFoundPage";
import ProductItemPage from "@pages/ProductItemPage";
import ProductsListPage from "@pages/ProductsListPage";

function App() {
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
