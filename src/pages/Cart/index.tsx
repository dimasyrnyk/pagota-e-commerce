import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Cart.scss";
import { AppDispatch, RootState } from "@store/index";
import { deleteOrderInCart, getCartProducts } from "@store/cart/actions";
import Header from "@containers/Header/Header";
import CheckoutForm from "@components/CheckoutForm/CheckoutForm";
import OrderForm from "@components/OrderForm/OrderForm";
import PrimaryBtn from "@components/Buttons/PrimaryBtn/PrimaryBtn";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch: AppDispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.cart);
  const { order } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(getCartProducts(cart.products));
  }, []);

  const handleClick = () => {
    dispatch(deleteOrderInCart());
  };

  if (order) {
    return (
      <div className="order-complete__container">
        <div className="order-complete__body">
          <h1>THANK YOU</h1>
          <h2>Your order is completed successfuly!</h2>
          <p>
            Order number <strong>{order}</strong>
          </p>
          <Link to="/products">
            <PrimaryBtn
              title="Back to shop"
              onClick={handleClick}
            />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="cart__container">
        <CheckoutForm />
        <OrderForm />
      </div>
    </>
  );
}

export default Cart;
