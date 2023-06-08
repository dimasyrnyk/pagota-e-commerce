import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./PromoCodeInput.scss";
import { RootState } from "@store/index";
import { formatPrice } from "@utils/products/prices";
import SecondaryBtn from "@components/Buttons/SecondaryBtn/SecondaryBtn";
import { ERROR_DELAY } from "@constants/products";
import { Discount } from "@constants/cart";

type Props = {
  subTotal: number;
  discount: Discount;
  setDiscount: ({}: Discount) => void;
};

function PromoCodeInput({ subTotal, discount, setDiscount }: Props) {
  const { cart } = useSelector((state: RootState) => state.cart);
  const [promoCode, setPromoCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  const showError = () => {
    setError("Promo code is out of date or invalid");
    setTimeout(() => {
      setError("");
    }, ERROR_DELAY);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPromoCode(newValue);
    const withDiscount = cart.promoCode.find(
      (item) => item.value === newValue.trim()
    );

    const newDiscount = {
      percent: withDiscount ? withDiscount.discount : 0,
      value: withDiscount ? discount.value : 0,
    };
    setDiscount(newDiscount);
  };

  const handleBlur = () => {
    if (!discount.percent && promoCode) {
      showError();
    }
  };

  const handleClick = () => {
    if (!!discount.percent) {
      const newDiscount = { ...discount };
      newDiscount.value = +formatPrice((discount.percent / 100) * subTotal);

      setDiscount(newDiscount);
    } else {
      showError();
    }
  };

  return (
    <div className="promo-code__container">
      <input
        className="promo-code__input"
        type="text"
        value={promoCode}
        placeholder="Apply promo code   SUMMER"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <SecondaryBtn
        className="promo-code__btn"
        onClick={handleClick}
        disabled={!promoCode}
        title="Apply now"
      />
      {error ? <span className="promo-code__error">{error}</span> : null}
    </div>
  );
}

export default PromoCodeInput;
