import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import "./ProductsListPage.scss";
import Header from "@containers/Header/Header";
import Footer from "@containers/Footer/Footer";
import ProductsList from "@components/ProductsList/ProductsList";
import AppLoader from "@components/AppLoader/AppLoader";
import { AppDispatch, RootState } from "@store/index";
import ChevronDownIcon from "@components/Icons/ChevronDownIcon";
import { IProduct } from "@constants/products";
import { filterProducts } from "@utils/filtersUtils";
import SideBar from "@components/SideBar/SideBar";
import ProductsQuantity from "@components/ProductsQuantity/ProductsQuantity";
import {
  setFilterBrands,
  setFilterCategory,
  setFilterPrices,
  setFilterQuery,
  setFilterRatings,
} from "@store/filters/actions";

function ProductsListPage() {
  const { allProducts, isLoading, minPrice, maxPrice } = useSelector(
    (state: RootState) => state.products
  );
  const { query, category, brands, ratings, prices } = useSelector(
    (state: RootState) => state.filters
  );

  const [result, setResult] = useState<IProduct[]>(allProducts);
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query") || "";
    const category = searchParams.get("category") || "";
    const brands = searchParams.getAll("brands") || [];
    const ratings =
      (searchParams.getAll("ratings") as string[]).map(Number) || [];
    const prices = {
      min: parseFloat(searchParams.getAll("price")[0]),
      max: parseFloat(searchParams.getAll("price")[1]),
    };

    query && dispatch(setFilterQuery(query));
    category && dispatch(setFilterCategory(category));
    brands.length && dispatch(setFilterBrands(brands));
    ratings.length && dispatch(setFilterRatings(ratings));
    prices.min && prices.max && dispatch(setFilterPrices(prices));
  }, []);

  useEffect(() => {
    const filteredProducts = filterProducts(allProducts, {
      query,
      category,
      brands,
      ratings,
      prices,
    });
    setResult(filteredProducts);
  }, [query, category, brands, ratings, prices, allProducts]);

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
        <div className="products-list__sort">
          <span>Sort By</span>
          <span>
            Select
            <ChevronDownIcon className="products-list__sort-icon" />
          </span>
        </div>
        <div className="products-list__body">
          <SideBar />
          <div className="body__container">
            {isLoading ? <AppLoader /> : <ProductsList products={result} />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductsListPage;
