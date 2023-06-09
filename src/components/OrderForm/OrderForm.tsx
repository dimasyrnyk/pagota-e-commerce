import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./OrderForm.scss";
import { AppDispatch, RootState } from "@store/index";
import { setTotlaPrice } from "@store/cart/actions";
import emptyCart from "@assets/images/empty-cart.svg";
import { formatPrice, getCurrentPrice } from "@utils/products/prices";
import { getDeliveryDate } from "@utils/order/delivery";
import { Discount, Taxes } from "@constants/cart";
import AppLoader from "@components/AppLoader/AppLoader";
import PrimaryBtn from "@components/Buttons/PrimaryBtn/PrimaryBtn";
import CartProductsList from "./CartProductsList/CartProductsList";
import PromoCodeInput from "./PromoCodeInput/PromoCodeInput";
import SummaryInfo from "./SummaryInfo/SummaryInfo";
import OrderSummary from "./OrderSummary/OrderSummary";

function OrderForm() {
  const dispatch: AppDispatch = useDispatch();
  const { cart, isLoading } = useSelector((state: RootState) => state.cart);
  const [discount, setDiscount] = useState<Discount>({ percent: 0, value: 0 });

  const subTotal = cart.products.reduce((acc, product) => {
    const currentPrice =
      getCurrentPrice(
        product.item.quantity[product.quantity.unit].price,
        product.item.discount
      ) * product.quantity.amount;

    return acc + currentPrice;
  }, 0);
  const taxes = subTotal * Taxes.COEFFICIENT;
  const maxDeliveryTime = cart.products.reduce((maxTime, product) => {
    return Math.max(maxTime, product.item.delivery.time);
  }, 0);
  const deliveryDate = getDeliveryDate(maxDeliveryTime);

  useEffect(() => {
    const totalPrice = subTotal - discount.value + taxes;
    const totalFormattedPrice = formatPrice(totalPrice);
    dispatch(setTotlaPrice(+totalFormattedPrice));
  }, [subTotal, discount.value]);

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
        <SummaryInfo
          subTotal={subTotal}
          discount={discount}
          taxes={taxes}
        />
        <PromoCodeInput
          subTotal={subTotal}
          discount={discount}
          setDiscount={setDiscount}
        />
        <OrderSummary deliveryDate={deliveryDate} />
      </div>
    </div>
  );
}

export default OrderForm;
