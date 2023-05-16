import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import "./SideBar.scss";
import { SLIDER_STEP } from "@constants/app";
import CustomSlider from "@components/CustomSlider/CustomSlider";
import { AppDispatch, RootState } from "@store/index";
import { setFilterPrices } from "@store/filters/actions";
import { updateUrl } from "@utils/filtersUtils";

type Price = {
  min: number;
  max: number;
  [key: string]: number;
};

const PriceRange = () => {
  const { minPrice, maxPrice } = useSelector(
    (state: RootState) => state.products
  );
  const filters = useSelector((state: RootState) => state.filters);
  const { prices } = useSelector((state: RootState) => state.filters);
  const [isValidMinPrice, setIsValidMinPrice] = useState<boolean>(true);
  const [isValidMaxPrice, setIsValidMaxPrice] = useState<boolean>(true);
  const [priceRange, setPriceRange] = useState<Price>({
    min: prices.min,
    max: prices.max,
  });
  const [validPriceRange, setValidPriceRange] = useState<Price>({
    min: prices.min,
    max: prices.max,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(setFilterPrices(validPriceRange));
    updateUrl({ ...filters, prices: validPriceRange }, navigate, location);
  }, [validPriceRange.min, validPriceRange.max]);

  useEffect(() => {
    setValidPriceRange({ min: prices.min, max: prices.max });
    setPriceRange({ min: prices.min, max: prices.max });
    setIsValidMinPrice(true);
    setIsValidMaxPrice(true);
  }, [prices.min, prices.max]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = parseInt(value, 10);

    if (isNaN(newValue)) {
      return;
    }

    if (name === "min") {
      if (newValue >= minPrice && newValue <= priceRange.max) {
        setValidPriceRange({ ...validPriceRange, min: newValue });
        setIsValidMinPrice(true);
      } else {
        setIsValidMinPrice(false);
      }
      setPriceRange({ ...priceRange, min: newValue });
    } else {
      if (newValue <= maxPrice && newValue >= priceRange.min) {
        setValidPriceRange({ ...validPriceRange, max: newValue });
        setIsValidMaxPrice(true);
      } else {
        setIsValidMaxPrice(false);
      }
      setPriceRange({ ...priceRange, max: newValue });
    }
  };

  const handleSliderChange = (prices: Price) => {
    setValidPriceRange(prices);
    setPriceRange(prices);
  };

  return (
    <div className="sidebar__price">
      <h3>Price</h3>
      <CustomSlider
        min={minPrice}
        max={maxPrice}
        step={SLIDER_STEP}
        price={validPriceRange}
        onChange={handleSliderChange}
      />

      <div className="price-input__container">
        <span>
          Min
          <span
            className={"price-input " + (!isValidMinPrice ? "input-error" : "")}
          >
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
          <span
            className={"price-input " + (!isValidMaxPrice ? "input-error" : "")}
          >
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
