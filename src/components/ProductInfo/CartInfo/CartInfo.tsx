import { useSelector } from "react-redux";

import "./CartInfo.scss";
import { RootState } from "@store/index";
import { IProduct } from "@constants/products";
import CartIcon from "@components/Icons/CartIcon";
import { Link } from "react-router-dom";

type Props = {
  product: IProduct;
};

function CartInfo({ product }: Props) {
  const { products } = useSelector((state: RootState) => state.cart.cart);
  const matchedProducts = products.filter((p) => p.id === product.id);

  if (!matchedProducts.length) {
    return null;
  }

  return (
    <div className="cart-info">
      <span>Already</span>
      {matchedProducts.map((product) => (
        <span
          key={product.id + product.quantity.unit}
          className="cart-info__item"
        >{`${product.quantity.amount} ${product.quantity.unit}`}</span>
      ))}
      <Link
        to={"/cart"}
        className="cart-info__link"
      >
        <span className="cart-info__icon-section">
          <span>In cart</span>
          <CartIcon />
        </span>
      </Link>
    </div>
  );
}

export default CartInfo;
