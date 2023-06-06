import { useSelector } from "react-redux";

import "./CartProductsList.scss";
import { RootState } from "@store/index";
import CartProductItem from "../CartProductItem/CartProductItem";

function CartProductsList() {
  const { products } = useSelector((state: RootState) => state.cart.cart);

  return (
    <ul className="product-list__container">
      {products.map((product) => (
        <CartProductItem
          key={product.item.id + product.quantity.unit}
          product={product}
        />
      ))}
    </ul>
  );
}

export default CartProductsList;
