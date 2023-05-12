import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import "./ProductsListPage.scss";
import Header from "@containers/Header/Header";
import Footer from "@containers/Footer/Footer";
import ProductsList from "@components/ProductsList/ProductsList";
import AppLoader from "@components/AppLoader/AppLoader";
import { AppDispatch, RootState } from "@store/index";
import { getAllProducts } from "@store/products/actions";
import ChevronDownIcon from "@components/Icons/ChevronDownIcon";
import { IProduct } from "@constants/products";
import searchProducts from "@utils/filters";

function ProductsListPage() {
  const { category, query } = useSelector((state: RootState) => state.filters);
  const { allProducts, isLoading } = useSelector(
    (state: RootState) => state.products
  );
  const [result, setResult] = useState<IProduct[]>(allProducts);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    setResult(searchProducts(allProducts, category, query));
  }, [query, category]);

  return (
    <>
      <Header />
      <div className="products-list__container">
        <div className="products-list__header">
          <h1>All Products</h1>
          <div className="products-list__quantity">
            <span>{result.length}</span>
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
          <section className="body__sidebar">Filters</section>
          <ul className="body__container">
            {isLoading ? <AppLoader /> : <ProductsList products={result} />}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductsListPage;
