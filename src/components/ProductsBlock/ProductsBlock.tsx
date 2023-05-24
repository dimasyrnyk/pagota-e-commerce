import { useEffect, useRef, useState } from "react";

import "./ProductsBlock.scss";
import ProductCard from "@components/ProductCard/ProductCard";
import AppLoader from "@components/AppLoader/AppLoader";
import SideBar from "@components/SideBar/SideBar";
import Pagination from "@components/Pagination/Pagination";
import { IProduct } from "@constants/products";
import { CURRENT_PAGE } from "@constants/app";

type Props = {
  products: IProduct[];
  isLoading: boolean;
};

function ProductsBlock({ products, isLoading }: Props) {
  const scrollToTopRef = useRef<HTMLDivElement>(null);
  const [currentProducts, setCurrentProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(CURRENT_PAGE);

  useEffect(() => {
    if (scrollToTopRef.current) {
      scrollToTopRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPage]);

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
      <div
        className="products-list__body"
        ref={scrollToTopRef}
      >
        <SideBar />
        <div className="body__container">
          {isLoading ? <AppLoader /> : renderProductsList()}
        </div>
      </div>
      <Pagination
        products={products}
        setProducts={setCurrentProducts}
        setPage={setCurrentPage}
      />
    </>
  );
}

export default ProductsBlock;
