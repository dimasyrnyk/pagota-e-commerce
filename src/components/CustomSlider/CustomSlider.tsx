import { useEffect, useState } from "react";
import "./CustomSlider.scss";

type Props = {
  min: number;
  max: number;
  price?: {
    min: number;
    max: number;
  };
  step: number;
  onChange: (price: { min: number; max: number }) => void;
};

const RangeSlider = ({ min, max, price, step, onChange }: Props) => {
  const [minValue, setMinValue] = useState(price ? price.min : min);
  const [maxValue, setMaxValue] = useState(price ? price.max : max);

  useEffect(() => {
    if (price) {
      setMinValue(price.min);
      setMaxValue(price.max);
    }
  }, [price]);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.name === "priceMin") {
      const newMinVal = Math.min(+e.target.value, maxValue - step);
      if (!price) setMinValue(newMinVal);
      onChange({ min: newMinVal, max: maxValue });
    } else {
      const newMaxVal = Math.max(+e.target.value, minValue + step);
      if (!price) setMaxValue(newMaxVal);
      onChange({ min: minValue, max: newMaxVal });
    }
  };

  const minPos = ((minValue - min) / (max - min)) * 100;
  const maxPos = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className="slider">
      <div className="range__container">
        <input
          className="range"
          type="range"
          name="priceMin"
          value={minValue}
          min={min}
          max={max}
          step={step}
          onChange={handleRangeChange}
        />
        <input
          className="range"
          type="range"
          name="priceMax"
          value={maxValue}
          min={min}
          max={max}
          step={step}
          onChange={handleRangeChange}
        />
      </div>

      <div className="control__container">
        <div
          className="control"
          style={{ left: `${minPos}%` }}
        />
        <div className="rail">
          <div
            className="inner-rail"
            style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
          />
        </div>
        <div
          className="control"
          style={{ left: `${maxPos}%` }}
        />
      </div>
    </div>
  );
};

export default RangeSlider;
