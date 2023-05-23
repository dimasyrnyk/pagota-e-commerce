import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./ProductsList.scss";
import Header from "@containers/Header/Header";
import Footer from "@containers/Footer/Footer";
import { RootState } from "@store/index";
import { filterProducts } from "@utils/filters/filterProducts";
import { IProduct } from "@constants/products";
import ProductsQuantity from "@components/ProductsQuantity/ProductsQuantity";
import ProductsBlock from "@components/ProductsBlock/ProductsBlock";
import SortBy from "@components/SortBy/SortBy";

function ProductsList() {
  const { allProducts, isLoading } = useSelector(
    (state: RootState) => state.products
  );
  const { query, category, brands, ratings, prices, sort } = useSelector(
    (state: RootState) => state.filters
  );
  const [result, setResult] = useState<IProduct[]>(allProducts);

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
        <ProductsBlock
          isLoading={isLoading}
          products={result}
        />
      </div>
      <Footer />
    </>
  );
}

export default ProductsList;
