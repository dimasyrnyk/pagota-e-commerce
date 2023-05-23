import { Link } from "react-router-dom";

import "./NotFound.scss";
import Header from "@containers/Header/Header";
import Footer from "@containers/Footer/Footer";

function NotFound() {
  return (
    <>
      <Header />
      <div className="not-found__container">
        <h2>NotFoundPage</h2>
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

export default NotFound;
