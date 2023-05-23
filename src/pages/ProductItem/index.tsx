import { Link } from "react-router-dom";

import "./ProductItem.scss";
import Header from "@containers/Header/Header";
import Footer from "@containers/Footer/Footer";

function ProductItem() {
  return (
    <>
      <Header />
      <div className="products-item__container">
        <h2>ProductItemPage</h2>
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
