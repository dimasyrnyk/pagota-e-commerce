import { useEffect, useState } from "react";

import "./PriceRange.scss";
import { SLIDER_STEP } from "@constants/app";
import CustomSlider from "@components/CustomSlider/CustomSlider";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";

type Price = {
  min: number;
  max: number;
  [key: string]: number;
};

type Props = {
  min?: number;
  max?: number;
  onChange?: (price: { min: number; max: number }) => void;
};

const PriceRange = ({ min, max, onChange }: Props) => {
  const { minPrice, maxPrice } = useSelector(
    (state: RootState) => state.products
  );
  const [priceRange, setPriceRange] = useState<Price>({
    min: minPrice,
    max: maxPrice,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = parseInt(value, 10);

    if (isNaN(newValue)) {
      return;
    }

    if (name === "min") {
      if (newValue >= minPrice && newValue <= priceRange.max) {
        setPriceRange({ ...priceRange, min: newValue });
      }
    } else {
      if (newValue <= maxPrice && newValue >= priceRange.min) {
        setPriceRange({ ...priceRange, max: newValue });
      }
    }
  };

  return (
    <div className="price-range">
      <CustomSlider
        min={minPrice}
        max={maxPrice}
        step={SLIDER_STEP}
        price={priceRange}
        onChange={setPriceRange}
      />

      <div className="price-input__container">
        <span>
          Min
          <span className="price-input">
            <input
              type="text"
              name="min"
              value={priceRange.min}
              placeholder="0"
              onChange={handleInputChange}
              className="price-input__body"
            />
          </span>
        </span>
        <span className="price-input__separator">_</span>
        <span>
          Max
          <span className="price-input">
            <input
              type="text"
              name="max"
              value={priceRange.max}
              placeholder="000"
              onChange={handleInputChange}
              className="price-input__body"
            />
          </span>
        </span>
      </div>
    </div>
  );
};

export default PriceRange;
