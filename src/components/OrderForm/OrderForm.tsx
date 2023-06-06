import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./OrderForm.scss";
import { AppDispatch, RootState } from "@store/index";
import { setTotlaPrice } from "@store/cart/actions";
import emptyCart from "@assets/images/empty-cart.svg";
import { formatPrice, getCurrentPrice } from "@utils/products/prices";
import { getDeliveryDate } from "@utils/order/getters";
import SecondaryBtn from "@components/Buttons/SecondaryBtn/SecondaryBtn";
import AppLoader from "@components/AppLoader/AppLoader";
import CartProductsList from "./CartProductsList/CartProductsList";
import PrimaryBtn from "@components/Buttons/PrimaryBtn/PrimaryBtn";
import { ERROR_DELAY } from "@constants/products";

function OrderForm() {
  const dispatch: AppDispatch = useDispatch();
  const { cart, isLoading } = useSelector((state: RootState) => state.cart);
  const [promoCode, setPromoCode] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const subTotal =
    cart.products.reduce((acc, product) => {
      const currentPrice =
        getCurrentPrice(
          product.item.quantity[product.quantity.unit].price,
          product.item.discount
        ) * product.quantity.amount;

      return acc + currentPrice;
    }, 0) - discountValue;
  const taxes = formatPrice(subTotal * 0.17);
  const maxDeliveryTime = cart.products.reduce((maxTime, product) => {
    return Math.max(maxTime, product.item.delivery.time);
  }, 0);
  const deliveryDate = getDeliveryDate(maxDeliveryTime);

  useEffect(() => {
    const totalPrice = formatPrice(subTotal + +taxes);
    dispatch(setTotlaPrice(+totalPrice));
  }, [subTotal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPromoCode(newValue);

    const withDiscount = cart.promoCode.find(
      (item) => item.value === newValue.trim()
    );

    const newDiscount = withDiscount ? withDiscount.discount : 0;
    setDiscountPercent(newDiscount);

    if (!newDiscount) {
      setDiscountValue(0);
    }
  };

  const showError = () => {
    setError("Promo code is out of date or invalid");
    setTimeout(() => {
      setError("");
    }, ERROR_DELAY);
  };

  const handleBlur = () => {
    if (!discountPercent && promoCode) {
      showError();
    }
  };

  const handleClick = () => {
    if (!!discountPercent) {
      const newDiscount = (100 - discountPercent) / 100;
      setDiscountValue(newDiscount);
    } else {
      showError();
    }
  };

  if (!cart.products.length) {
    return (
      <div className="order-form__container">
        <center className="order-form">
          <img src={emptyCart} />
          <h3>Your cart is empty</h3>
          <p>You have no items in your shopping cart</p>
          <p>Let's go buy something.</p>
          <Link to="/products">
            <PrimaryBtn title="Shop Now" />
          </Link>
        </center>
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
          {discountValue ? (
            <li className="order-form__taxes-row">
              <span>Discount</span>
              <span>
                {discountPercent}% {discountValue} USD
              </span>
            </li>
          ) : null}
        </ul>
        <div className="order-form__promo-code">
          <input
            type="text"
            value={promoCode}
            placeholder="Apply promo code   SUMMER"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <SecondaryBtn
            className="order-form__promo-code-btn"
            onClick={handleClick}
            disabled={!promoCode}
            title="Apply now"
          />
          {error ? (
            <span className="order-form__promo-code-error">{error}</span>
          ) : null}
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
