import "./ProductPrice.scss";
import { IProduct } from "@constants/products";
import { formatPrice, getCurrentPrice } from "@utils/products/prices";

type Props = {
  price: number;
  discount: number;
  quantity?: number;
  className?: string;
};

function ProductPrice({ price, discount, quantity, className = "" }: Props) {
  const currentPrice = getCurrentPrice(price, discount);
  const totalNewPrice = quantity ? currentPrice * quantity : currentPrice;
  const totalOldPrice = quantity ? price * quantity : price;

  return (
    <div className="product-price__container">
      <h3 className={"product-price__current " + className}>
        {formatPrice(totalNewPrice)} USD
      </h3>
      {discount ? (
        <span className="product-price__old">{formatPrice(totalOldPrice)}</span>
      ) : null}
    </div>
  );
}

export default ProductPrice;
