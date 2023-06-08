import { useSelector } from "react-redux";

import "./OrderSummary.scss";
import { RootState } from "@store/index";

type Props = {
  deliveryDate: string;
};

function OrderSummary({ deliveryDate }: Props) {
  const { cart } = useSelector((state: RootState) => state.cart);

  return (
    <div className="order-summary__container">
      <div className="order-summary__left-side">
        <span>Total Order</span>
        <span>Guaranteed delivery day: {deliveryDate}</span>
      </div>
      <span className="order-summary__right-side">
        {cart.totalPrice ? cart.totalPrice : 0} USD
      </span>
    </div>
  );
}

export default OrderSummary;
