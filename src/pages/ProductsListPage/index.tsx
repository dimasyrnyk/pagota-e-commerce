import { useEffect } from "react";
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

function ProductsListPage() {
  const { allProducts, isLoading } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <>
      <Header />
      <div className="products-list__container">
        <div className="products-list__header">
          <h1>All Products</h1>
          <ul className="products-list__quantity">
            <li>{allProducts.length}22</li>
            <li>Products</li>
          </ul>
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
          <div className="body__container">
            {isLoading ? (
              <AppLoader />
            ) : (
              <ProductsList products={allProducts} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductsListPage;
