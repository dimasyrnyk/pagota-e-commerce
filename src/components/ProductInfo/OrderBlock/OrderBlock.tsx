import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import "./OrderBlock.scss";
import { AppDispatch } from "@store/index";
import { addProductToCart, updateProductInCart } from "@store/cart/actions";
import { getNewTotalQuantity } from "@utils/order/quantity";
import { getMatchedUnits } from "@utils/order/units";
import { INITIAL_QUANTITY, INITIAL_UNIT, IProduct } from "@constants/products";
import PlusIcon from "@components/Icons/PlusIcon";
import PrimaryBtn from "@components/Buttons/PrimaryBtn/PrimaryBtn";
import OrderBlockInput from "./OrderBlockInput";
import ProductPrice from "@components/ProductCard/ProductPrice/ProductPrice";
import { getNewCartProduct } from "@utils/order/cart";

type Props = {
  product: IProduct;
};

function OrderBlock({ product }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const [quantity, setQuantity] = useState<number>(INITIAL_QUANTITY);
  const [unit, setUnit] = useState<string>(INITIAL_UNIT);
  const [counter, setCounter] = useState<number>(0);
  const productTotalQuantity = useMemo(
    () => getNewTotalQuantity(product, unit, true),
    [unit, counter]
  );

  useEffect(() => {
    if (!productTotalQuantity) {
      setQuantity(0);
    }
  }, [productTotalQuantity]);

  const handleAddToCart = () => {
    const matchedUnits = getMatchedUnits(product, unit);

    const newCartQuantity = matchedUnits.length
      ? quantity + matchedUnits[0].quantity.amount
      : quantity;

    const newCartProduct = getNewCartProduct(product, unit, newCartQuantity);

    if (matchedUnits.length) {
      dispatch(updateProductInCart(newCartProduct));
    } else {
      dispatch(addProductToCart(newCartProduct));
    }
    setQuantity(INITIAL_QUANTITY);
    setCounter(counter + 1);
  };

  const handleSetUnit = (selectedUnit: string) => {
    setUnit(selectedUnit);
    setQuantity(INITIAL_QUANTITY);
  };

  return (
    <div className="order-block__controls">
      <ProductPrice
        className="order-block__price"
        price={product.quantity[unit].price}
        discount={product.discount}
        quantity={quantity}
      />
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
