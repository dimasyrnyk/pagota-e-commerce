import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import "./ProductsListPage.scss";
import Header from "@containers/Header/Header";
import Footer from "@containers/Footer/Footer";
import ProductsList from "@components/ProductsList/ProductsList";
import SortBy from "@components/SortBy/SortBy";
import ProductsQuantity from "@components/ProductsQuantity/ProductsQuantity";
import { AppDispatch, RootState } from "@store/index";
import { IProduct } from "@constants/products";
import { filterProducts, parseSearchParams } from "@utils/filtersUtils";

function ProductsListPage() {
  const { allProducts, isLoading } = useSelector(
    (state: RootState) => state.products
  );
  const { query, category, brands, ratings, prices, sort } = useSelector(
    (state: RootState) => state.filters
  );

  const [result, setResult] = useState<IProduct[]>(allProducts);
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    parseSearchParams(searchParams, dispatch);
  }, []);

  useEffect(() => {
    const filteredProducts = filterProducts(allProducts, {
      query,
      category,
      brands,
      ratings,
      prices,
      sort,
    });
    setResult(filteredProducts);
  }, [query, category, brands, ratings, prices, sort, allProducts]);

  return (
    <>
      <Header />
      <div className="products-list__container">
        <div className="products-list__header">
          <h1>All Products</h1>
          <div className="products-list__quantity">
            <ProductsQuantity quantity={result.length} />
            <span>Products</span>
          </div>
        </div>
        <SortBy />
        <ProductsList
          isLoading={isLoading}
          products={result}
        />
      </div>
      <Footer />
    </>
  );
}

export default ProductsListPage;
