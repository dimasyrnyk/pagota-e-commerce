import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import queryString from "query-string";

import "./App.scss";
import { AppDispatch } from "@store/index";
import { getAllProducts } from "@store/products/actions";
import { parseSearchParams } from "@utils/filters/searchParams";
import Cart from "@pages/Cart";
import Home from "@pages/Home";
import NotFound from "@pages/NotFound";
import ProductItem from "@pages/ProductItem";
import ProductsList from "@pages/ProductsList";
import WishList from "@pages/WishList";

function App() {
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  const getData = async () => {
    await dispatch(getAllProducts());

    const searchParams = queryString.parse(location.search, {
      arrayFormat: "comma",
    });
    parseSearchParams(searchParams, dispatch);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="app__container">
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/products"
          element={<ProductsList />}
        />
        <Route
          path="/products/:id"
          element={<ProductItem />}
        />
        <Route
          path="/cart"
          element={<Cart />}
        />
        <Route
          path="/wishlist"
          element={<WishList />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </div>
  );
}

export default App;
