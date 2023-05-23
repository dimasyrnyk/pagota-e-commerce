import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import "./ProductItem.scss";
import { AppDispatch, RootState } from "@store/index";
import { getOneProduct } from "@store/products/actions";
import Header from "@containers/Header/Header";
import Footer from "@containers/Footer/Footer";

function ProductItem() {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { selectedProduct } = useSelector((state: RootState) => state.products);

  const getData = async () => {
    id && (await dispatch(getOneProduct(id)));
  };

  useEffect(() => {
    getData();
  }, []);

  if (!selectedProduct || selectedProduct.id !== id) {
    return (
      <>
        <Header />
        <div className="products-item__container">
          <h2>Please go back for safety.</h2>
          <Link to="/products">Back to products</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="products-item__container">
        <h2>{selectedProduct.title}</h2>
        <Link to="/">HomePage</Link>
        <Link to="/cart">CartPage</Link>
        <Link to="/products">ProductsListPage</Link>
        <Link to="/products/id">ProductItemPage</Link>
        <Link to="*">NotFoundPage</Link>
      </div>
      <Footer />
    </>
  );
}

export default ProductItem;
