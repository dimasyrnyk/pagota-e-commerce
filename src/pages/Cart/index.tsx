import { Link } from "react-router-dom";

import "./Cart.scss";
import Header from "@containers/Header/Header";

function Cart() {
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

export default Cart;