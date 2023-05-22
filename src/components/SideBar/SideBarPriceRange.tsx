import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import "./SideBar.scss";
import { AppDispatch, RootState } from "@store/index";
import { setFilterPrices } from "@store/filters/actions";
import { Prices, SLIDER_STEP } from "@constants/app";
import { updateUrl } from "@utils/filters/searchParams";
import CustomSlider from "@components/CustomSlider/CustomSlider";

const initState = {
  min: true,
  max: true,
};

type State = {
  min: boolean;
  max: boolean;
};

type Price = {
  min: number;
  max: number;
  [key: string]: number;
};

const PriceRange = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const { minPrice, maxPrice } = useSelector(
    (state: RootState) => state.products
  );
  const filters = useSelector((state: RootState) => state.filters);
  const { prices } = useSelector((state: RootState) => state.filters);
  const [isValidPrices, setIsValidPrices] = useState<State>(initState);
  const [priceRange, setPriceRange] = useState<Price>({ ...prices });
  const [validPriceRange, setValidPriceRange] = useState<Price>({ ...prices });

  useEffect(() => {
    setValidPriceRange({ ...prices });
    setPriceRange({ ...prices });
    setIsValidPrices(initState);
  }, [prices.min, prices.max]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = parseInt(value, 10);

    if (isNaN(newValue)) {
      newValue = 0;
      setIsValidPrices({ ...isValidPrices, [name]: false });
    } else if (
      (name === Prices.MIN &&
        newValue >= minPrice &&
        newValue <= priceRange.max) ||
      (name === Prices.MAX &&
        newValue <= maxPrice &&
        newValue >= priceRange.min)
    ) {
      setValidPriceRange({ ...validPriceRange, [name]: newValue });
      setIsValidPrices({ ...isValidPrices, [name]: true });
      dispatch(setFilterPrices({ ...validPriceRange, [name]: newValue }));
      updateUrl(
        { ...filters, prices: { ...validPriceRange, [name]: newValue } },
        navigate,
        location
      );
    } else {
      setIsValidPrices({ ...isValidPrices, [name]: false });
    }

    setPriceRange({ ...priceRange, [name]: newValue });
  };

  const handleSliderChange = (prices: Price) => {
    dispatch(setFilterPrices(prices));
    updateUrl({ ...filters, prices }, navigate, location);
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
        <span className="price-input__wrapper">
          Min
          <span
            className={
              "price-input " + (!isValidPrices.min ? "input__error" : "")
            }
          >
            <input
              type="text"
              name={Prices.MIN}
              value={priceRange.min}
              placeholder="0"
              onChange={handleInputChange}
              className="price-input__body"
            />
          </span>
          {!isValidPrices.min && (
            <span className="input__error-msg">
              {`Plese enter from ${minPrice} to ${validPriceRange.max}`}
            </span>
          )}
        </span>
        <span className="price-input__separator">_</span>
        <span className="price-input__wrapper">
          Max
          <span
            className={
              "price-input " + (!isValidPrices.max ? "input__error" : "")
            }
          >
            <input
              type="text"
              name={Prices.MAX}
              value={priceRange.max}
              placeholder="000"
              onChange={handleInputChange}
              className="price-input__body"
            />
          </span>
          {!isValidPrices.max && (
            <span className="input__error-msg">
              {`Plese enter from ${validPriceRange.min} to ${maxPrice}`}
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

export default PriceRange;
