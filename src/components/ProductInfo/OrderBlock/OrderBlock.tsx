import { useState } from "react";

import "./OrderBlock.scss";
import { formatPrice, getCurrentPrice } from "@utils/products/prices";
import { INITIAL_QUANTITY, INITIAL_UNIT, IProduct } from "@constants/products";
import PlusIcon from "@components/Icons/PlusIcon";
import PrimaryBtn from "@components/Buttons/PrimaryBtn/PrimaryBtn";
import CustomSelect from "@components/CustomSelect/CustomSelect";

type Props = {
  product: IProduct;
};

function OrderBlock({ product }: Props) {
  const [quantity, setQuantity] = useState<number>(INITIAL_QUANTITY);
  const [unit, setUnit] = useState<string>(INITIAL_UNIT);
  const [error, setError] = useState<string>("");
  const currentPrice =
    getCurrentPrice(product.price[unit], product.discount) * quantity;
  const productTotalQuantity = product.quantity[unit];

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +e.target.value;
    if (newValue) {
      if (newValue <= productTotalQuantity) {
        setQuantity(newValue);
      } else {
        setError(`In stock only ${productTotalQuantity} ${unit}`);
        setTimeout(() => {
          setError("");
        }, 4000);
      }
    }
  };

  const handleUnitChange = (selectedUnit: string) => {
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
            {formatPrice(product.price.pcs)}
          </span>
        ) : null}
      </div>
      <div className="order-block__buttons-block">
        <span className="order-block__input">
          <input
            className="order-block__input-body"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <CustomSelect
            className="order-block__input-label"
            title={unit}
            options={Object.keys(product.price)}
            activeOption={unit}
            onChange={handleUnitChange}
          />
          {error ? <span className="order-block__error">{error}</span> : null}
        </span>
        <PrimaryBtn className="order-block__add-btn">
          <PlusIcon /> Add to cart
        </PrimaryBtn>
      </div>
    </div>
  );
}

export default OrderBlock;
