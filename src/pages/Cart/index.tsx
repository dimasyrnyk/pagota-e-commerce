import { Link } from "react-router-dom";

import "./Cart.scss";
import Header from "@containers/Header/Header";
import BillingForm from "@components/BillingForm/BillingForm";

function Cart() {
  return (
    <>
      <Header />
      <div className="cart__container">
        <BillingForm />
        <div className="order-info__container">
          <div className="billing-form__section-header">
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
