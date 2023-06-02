import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./OrderForm.scss";
import { AppDispatch, RootState } from "@store/index";
import { formatPrice, getCurrentPrice } from "@utils/products/prices";
import { getDeliveryDate } from "@utils/order/getters";
import SecondaryBtn from "@components/Buttons/SecondaryBtn/SecondaryBtn";
import AppLoader from "@components/AppLoader/AppLoader";
import CartProductsList from "./CartProductsList/CartProductsList";
import { setTotlaPrice } from "@store/cart/actions";

function OrderForm() {
  const dispatch: AppDispatch = useDispatch();
  const { cart, isLoading } = useSelector((state: RootState) => state.cart);
  const [promoCode, setPromoCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(1);

  const subTotal =
    cart.products.reduce((acc, product) => {
      const currentPrice =
        getCurrentPrice(
          product.item.quantity[product.quantity.unit].price,
          product.item.discount
        ) * product.quantity.amount;

      return acc + currentPrice;
    }, 0) * discount;
  const taxes = formatPrice(subTotal * 0.17);
  const maxDeliveryTime = cart.products.reduce((maxTime, product) => {
    return Math.max(maxTime, product.item.delivery.time);
  }, 0);
  const deliveryDate = getDeliveryDate(maxDeliveryTime);

  useEffect(() => {
    const totalPrice = formatPrice(subTotal + +taxes);
    dispatch(setTotlaPrice(+totalPrice));
  }, [subTotal, discount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trim();
    setPromoCode(newValue);
  };

  const handleClick = () => {
    const withDiscount = cart.promoCode.find(
      (item) => item.promoCode === promoCode.trim()
    );

    if (withDiscount) {
      const newDiscount = (100 - withDiscount.discount) / 100;
      setDiscount(newDiscount);
    }
  };

  if (!cart.products.length) {
    return (
      <div className="order-form__container">
        <div className="order-form">
          <h3>YOUR CATR IS EMPTY</h3>
          <Link to="/products">Please chose your products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-form__container">
      <div className="order-form">
        <div className="order-form__header-section">
          <h2>Order Summary</h2>
          <span>
            Price can change depending on shipping method and taxes of your
            state.
          </span>
        </div>
        <div className="order-form__products">
          {!isLoading ? <CartProductsList /> : <AppLoader />}
        </div>
        <ul className="order-form__taxes">
          <li className="order-form__taxes-row">
            <span>Subtotal</span>
            <span>{formatPrice(subTotal)} USD</span>
          </li>
          <li className="order-form__taxes-row">
            <span>Tax</span>
            <span>17% {taxes} USD</span>
          </li>
        </ul>
        <div className="order-form__promo-code">
          <input
            type="text"
            value={promoCode}
            placeholder="Apply promo code   SUMMER"
            onChange={handleChange}
          />
          <SecondaryBtn
            className="order-form__promo-code-btn"
            onClick={handleClick}
            title="Apply now"
          />
        </div>
        <div className="order-form__total-block">
          <div className="order-form__total-block_left">
            <span>Total Order</span>
            <span>Guaranteed delivery day: {deliveryDate}</span>
          </div>
          <span className="order-form__total-block_right">
            {cart.totalPrice ? cart.totalPrice : 0} USD
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderForm;
