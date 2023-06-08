import "./SummaryInfo.scss";
import { formatPrice } from "@utils/products/prices";
import { Discount } from "@constants/cart";

type Props = {
  subTotal: number;
  discount: Discount;
  taxes: number;
};

function SummaryInfo({ subTotal, discount, taxes }: Props) {
  return (
    <ul className="summary-info">
      <li className="summary-info__item">
        <span>Subtotal</span>
        <span>{formatPrice(subTotal)} USD</span>
      </li>
      {discount.value ? (
        <li className="summary-info__item">
          <span>Discount</span>
          <span>
            {discount.percent}% {discount.value} USD
          </span>
        </li>
      ) : null}
      <li className="summary-info__item">
        <span>Tax</span>
        <span>17% {formatPrice(taxes)} USD</span>
      </li>
    </ul>
  );
}

export default SummaryInfo;
