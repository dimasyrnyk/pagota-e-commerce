import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import "./ProductItem.scss";
import { AppDispatch, RootState } from "@store/index";
import { getOneProduct } from "@store/products/actions";
import Header from "@containers/Header/Header";
import Footer from "@containers/Footer/Footer";
import AppLoader from "@components/AppLoader/AppLoader";
import ImageBlock from "@components/ImageBlock/ImageBlock";
import ProductInfo from "@components/ProductInfo/ProductInfo";
import SuggestedProducts from "@components/SuggestedProducts/SuggestedProducts";

function ProductItem() {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { selectedProduct, isLoading } = useSelector(
    (state: RootState) => state.products
  );
  const product =
    selectedProduct && selectedProduct.id === id ? selectedProduct : null;

  const getData = async () => {
    if (id && !product) {
      await dispatch(getOneProduct(id));
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const renderLoading = () => {
    if (isLoading) {
      return <AppLoader />;
    }
  };

  const renderNotFoundProduct = () => {
    if (!isLoading && !product) {
      return (
        <center>
          <h3>Product not found. Please go back for safety.</h3>
          <Link to="/products">Back to products</Link>
        </center>
      );
    }
  };

  const renderProduct = () => {
    if (product) {
      return (
        <>
          <div className="product-item">
            <div className="product-item__first-column">
              <div className="product-item__additional-info">
                {product.discount ? <span>- {product.discount} %</span> : null}
                {!product.delivery.price ? <span>Free shipping</span> : null}
              </div>
              <ImageBlock product={product} />
            </div>
            <ProductInfo product={product} />
          </div>
          <SuggestedProducts category={product.category} />
        </>
      );
    }
  };

  return (
    <>
      <Header />
      <div className="product-item__container">
        {renderLoading()}
        {renderNotFoundProduct()}
        {renderProduct()}
      </div>
      <Footer />
    </>
  );
}

export default ProductItem;
