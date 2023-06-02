import { Link } from "react-router-dom";

import "./Cart.scss";
import Header from "@containers/Header/Header";
import CheckoutForm from "@components/CheckoutForm/CheckoutForm";

function Cart() {
  return (
    <>
      <Header />
      <div className="cart__container">
        <CheckoutForm />
        <div className="order-info__container">
          <div className="billing-form__header-section">
            <h2>Order Summary</h2>
            <span>
              Price can change depending on shipping method and taxes of your
              state.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
