import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import "./SideBar.scss";
import ProductsQuantity from "@components/ProductsQuantity/ProductsQuantity";
import { getCategoryLength } from "@utils/productUtils";
import {
  setFilterBrands,
  setFilterCategory,
  setFilterRatings,
} from "@store/filters/actions";
import { AppDispatch, RootState } from "@store/index";
import Rating from "@components/Rating/Rating";
import { SIDEBAR_RATING } from "@constants/app";
import CustomCheckbox from "@components/CustomCheckbox/CustomCheckbox";
import CloseBtn from "@components/Buttons/CloseBtn/CloseBtn";
import FilterBtn from "@components/Buttons/FilterBtn/FilterBtn";
import PriceRange from "@components/PriceRange/PriceRange";
import { resetFilters } from "@store/filters/actions";
import { ALL_CATEGORIES } from "@constants/categories";
import { updateUrl } from "@utils/filtersUtils";

function SideBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const filters = useSelector((state: RootState) => state.filters);
  const { categories, brands, minPrice, maxPrice } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const classes = isOpen ? "open" : "close";

  const handleCategoryChange = (categoryName: string) => {
    dispatch(setFilterCategory(categoryName));
    updateUrl({ ...filters, category: categoryName }, navigate, location);
  };

  const handleBrandToggle = (selecedBrand: string) => {
    const updatedBrands = filters.brands.includes(selecedBrand)
      ? filters.brands.filter((brand) => brand !== selecedBrand)
      : [...filters.brands, selecedBrand];
    dispatch(setFilterBrands(updatedBrands));
    updateUrl({ ...filters, brands: updatedBrands }, navigate, location);
  };

  const handleRatingToggle = (selectedRating: number) => {
    const updatedRatings = filters.ratings.includes(selectedRating)
      ? filters.ratings.filter((rating) => rating !== selectedRating)
      : [...filters.ratings, selectedRating];
    dispatch(setFilterRatings(updatedRatings));
    updateUrl({ ...filters, ratings: updatedRatings }, navigate, location);
  };

  const handleResetFilters = () => {
    dispatch(
      resetFilters({
        query: "",
        category: ALL_CATEGORIES,
        brands: [],
        ratings: [],
        prices: { min: minPrice, max: maxPrice },
      })
    );
    updateUrl({}, navigate, location);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <FilterBtn onClick={handleOpen} />
      <section className="sidebar__wrapper">
        <div className={"sidebar__container mobile-" + classes}>
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
                {brands.map((brand) => {
                  const isChecked = filters.brands.includes(brand);
                  return (
                    <CustomCheckbox
                      key={brand}
                      checked={isChecked}
                      onChange={() => handleBrandToggle(brand)}
                      label={brand}
                    />
                  );
                })}
              </ul>
            </div>
            <div className="sidebar__rating">
              <h3>Rating</h3>
              <ul className="sidebar__brands-list">
                {SIDEBAR_RATING.map((rating) => {
                  const isChecked = filters.ratings.includes(rating);
                  return (
                    <CustomCheckbox
                      key={rating}
                      checked={isChecked}
                      onChange={() => handleRatingToggle(rating)}
                      label={
                        <Rating
                          rating={rating}
                          isMonochrome={false}
                        />
                      }
                    />
                  );
                })}
              </ul>
            </div>
            <div className="sidebar__price">
              <h3>Price</h3>
              <PriceRange />
            </div>
            <span
              className="sidebar__reset-btn"
              onClick={handleResetFilters}
            >
              Reset
            </span>
          </div>
        </div>
      </section>
      <div
        className={"sidebar__overlay-" + classes}
        onClick={handleClose}
      />
    </div>
  );
}

export default SideBar;
