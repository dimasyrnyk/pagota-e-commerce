import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Cart.scss";
import { AppDispatch, RootState } from "@store/index";
import { getCartProducts } from "@store/cart/actions";
import Header from "@containers/Header/Header";
import CheckoutForm from "@components/CheckoutForm/CheckoutForm";
import OrderForm from "@components/OrderForm/OrderForm";

function Cart() {
  const dispatch: AppDispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(getCartProducts(cart.products));
  }, []);

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
