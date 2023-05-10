import { Link } from "react-router-dom";

import "./CartPage.scss";
import Header from "@containers/Header/Header";

function CartPage() {
  return (
    <>
      <Header />
      <div className="cart__container">
        <h2>CartPage</h2>
        <Link to="/">HomePage</Link>
        <Link to="/cart">CartPage</Link>
        <Link to="/products">ProductsListPage</Link>
        <Link to="/products/id">ProductItemPage</Link>
        <Link to="*">NotFoundPage</Link>
      </div>
    </>
  );
}

export default CartPage;
