import { useState } from "react";

import "./OrderBlock.scss";
import { ERROR_DELAY } from "@constants/products";
import CustomSelect from "@components/CustomSelect/CustomSelect";

type Props = {
  unit: string;
  setUnit: (unit: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  totalQuantity: number;
  options: string[];
  className?: string;
};

function OrderBlockInput({
  unit,
  setUnit,
  quantity,
  setQuantity,
  totalQuantity,
  options,
  className,
}: Props) {
  const [error, setError] = useState<string>("");

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);

    if (newValue >= 0) {
      if (newValue <= totalQuantity) {
        setQuantity(newValue);
      } else {
        setError(`In stock only ${totalQuantity} ${unit}`);
        setTimeout(() => {
          setError("");
        }, ERROR_DELAY);
      }
    } else {
      setQuantity(0);
    }
  };

  const handleUnitChange = (selectedUnit: string) => {
    setUnit(selectedUnit);
  };

  return (
    <span className={"order-block__input " + className}>
      <input
        className="order-block__input-body"
        type="number"
        pattern="[0-9]*"
        inputMode="numeric"
        value={quantity.toString()}
        onChange={handleQuantityChange}
      />
      <CustomSelect
        className="order-block__input-label"
        title={unit}
        options={options}
        activeOption={unit}
        onChange={handleUnitChange}
      />
      {error ? <span className="order-block__error">{error}</span> : null}
    </span>
  );
}

export default OrderBlockInput;
