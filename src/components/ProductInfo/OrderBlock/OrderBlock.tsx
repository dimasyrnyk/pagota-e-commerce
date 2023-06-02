import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./OrderBlock.scss";
import { AppDispatch, RootState } from "@store/index";
import { addProductToCart, updateProductInCart } from "@store/cart/actions";
import { formatPrice, getCurrentPrice } from "@utils/products/prices";
import { getNewTotalQuantity } from "@utils/order/getters";
import { INITIAL_QUANTITY, INITIAL_UNIT, IProduct } from "@constants/products";
import PlusIcon from "@components/Icons/PlusIcon";
import PrimaryBtn from "@components/Buttons/PrimaryBtn/PrimaryBtn";
import OrderBlockInput from "./OrderBlockInput";

type Props = {
  product: IProduct;
};

function OrderBlock({ product }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.cart.cart);
  const [quantity, setQuantity] = useState<number>(INITIAL_QUANTITY);
  const [unit, setUnit] = useState<string>(INITIAL_UNIT);
  const productTotalQuantity = useMemo(
    () => getNewTotalQuantity(product, unit),
    [unit]
  );
  const currentPrice =
    getCurrentPrice(product.quantity[unit].price, product.discount) * quantity;
  const currentOldPrice = product.quantity[unit].price * quantity;

  const handleAddToCart = () => {
    const matchedProducts = products.filter((p) => p.id === product.id);
    const matchedUnits = matchedProducts.filter(
      (p) => p.quantity.unit === unit
    );

    const newCartQuantity = matchedUnits.length
      ? quantity + matchedUnits[0].quantity.amount
      : quantity;

    const newCartProduct = {
      id: product.id,
      item: product,
      quantity: {
        unit: unit,
        amount: newCartQuantity,
      },
    };

    if (matchedUnits.length) {
      dispatch(updateProductInCart(newCartProduct));
    } else {
      dispatch(addProductToCart(newCartProduct));
    }
  };

  const handleSetUnit = (selectedUnit: string) => {
    setUnit(selectedUnit);
    setQuantity(INITIAL_QUANTITY);
  };

  return (
    <div className="order-block__controls">
      <div className="order-block__price">
        <h3 className="order-block__price-current">
          {formatPrice(currentPrice)} USD
        </h3>
        {product.discount ? (
          <span className="order-block__price-old">
            {formatPrice(currentOldPrice)}
          </span>
        ) : null}
      </div>
      <div className="order-block__buttons-block">
        <OrderBlockInput
          unit={unit}
          setUnit={handleSetUnit}
          quantity={quantity}
          setQuantity={setQuantity}
          totalQuantity={productTotalQuantity}
          options={Object.keys(product.quantity)}
          className="unit-input"
        />
        <PrimaryBtn
          disabled={!quantity}
          onClick={handleAddToCart}
          className="order-block__add-btn"
        >
          <PlusIcon /> Add to cart
        </PrimaryBtn>
      </div>
    </div>
  );
}

export default OrderBlock;
