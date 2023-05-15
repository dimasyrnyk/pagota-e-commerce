import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import "./SideBar.scss";
import ProductsQuantity from "@components/ProductsQuantity/ProductsQuantity";
import { getCategoryLength } from "@utils/productUtils";
import { setFilterCategory } from "@store/filters/actions";
import { AppDispatch, RootState } from "@store/index";
import Rating from "@components/Rating/Rating";
import { SIDEBAR_RATING } from "@constants/app";
import CustomCheckbox from "@components/CustomCheckbox/CustomCheckbox";
import CloseBtn from "@components/Buttons/CloseBtn/CloseBtn";
import FilterBtn from "@components/Buttons/FilterBtn/FilterBtn";
import PriceRange from "@components/PriceRange/PriceRange";

function SideBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const { categories, brands } = useSelector(
    (state: RootState) => state.products
  );
  const [priceRange, setPriceRange] = useState({
    min: 1,
    max: 2,
  });
  const dispatch: AppDispatch = useDispatch();
  const classes = isOpen ? "open" : "close";

  const handleCategoryChange = (categoryName: string) => {
    dispatch(setFilterCategory(categoryName));
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <FilterBtn onClick={handleOpen} />
      <section className={"sidebar__container mobile-" + classes}>
        <div className="sidebar">
          <div className="mobile-btn">
            <CloseBtn onClick={handleClose} />
          </div>
          <div className="sidebar__categories">
            <h3>Categories</h3>
            <ul className="sidebar__categories-list">
              {categories.map((cat) => (
                <li key={cat}>
                  <span onClick={() => handleCategoryChange(cat)}>{cat}</span>
                  <ProductsQuantity quantity={getCategoryLength(cat)} />
                </li>
              ))}
            </ul>
          </div>
          <div className="sidebar__brands">
            <h3>Brands</h3>
            <ul className="sidebar__brands-list">
              {brands.map((brand) => (
                <CustomCheckbox
                  key={brand}
                  isChecked={checked}
                  onChange={setChecked}
                  label={brand}
                />
              ))}
            </ul>
          </div>
          <div className="sidebar__rating">
            <h3>Rating</h3>
            <ul className="sidebar__brands-list">
              {SIDEBAR_RATING.map((item) => (
                <CustomCheckbox
                  key={item}
                  isChecked={checked}
                  onChange={setChecked}
                  label={
                    <Rating
                      rating={item}
                      isMonochrome={false}
                    />
                  }
                />
              ))}
            </ul>
          </div>
          <div className="sidebar__price">
            <h3>Price</h3>
            <PriceRange
              min={1}
              max={1}
              onChange={setPriceRange}
            />
          </div>
          <span className="sidebar__reset-btn">Reset</span>
        </div>
      </section>
    </>
  );
}

export default SideBar;
