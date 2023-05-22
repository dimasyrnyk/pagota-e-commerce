import { useState } from "react";

import "./ProductsList.scss";
import ProductCard from "@components/ProductCard/ProductCard";
import AppLoader from "@components/AppLoader/AppLoader";
import SideBar from "@components/SideBar/SideBar";
import Pagination from "@components/Pagination/Pagination";
import { IProduct } from "@constants/products";

type Props = {
  products: IProduct[];
  isLoading: boolean;
};

function ProductsList({ products, isLoading }: Props) {
  const [currentProducts, setCurrentProducts] = useState<IProduct[]>([]);

  const renderProductsList = () => {
    if (!currentProducts.length) {
      return <center>No products found</center>;
    }

    return currentProducts.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
      />
    ));
  };

  return (
    <>
      <div className="products-list__body">
        <SideBar />
        <div className="body__container">
          {isLoading ? <AppLoader /> : renderProductsList()}
        </div>
      </div>
      <Pagination
        products={products}
        setProducts={setCurrentProducts}
      />
    </>
  );
}

export default ProductsList;
