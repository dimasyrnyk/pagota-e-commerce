import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import "./SideBar.scss";
import { AppDispatch, RootState } from "@store/index";
import { resetFilters } from "@store/filters/actions";
import { updateUrl } from "@utils/filters/searchParams";
import CloseBtn from "@components/Buttons/CloseBtn/CloseBtn";
import FilterBtn from "@components/Buttons/FilterBtn/FilterBtn";
import SideBarCategoriesList from "./SideBarCategoriesList";
import SideBarBrandsList from "./SideBarBrandsList";
import SideBarRatingsList from "./SideBarRatingsList";
import SideBarPriceRange from "./SideBarPriceRange";

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const { minPrice, maxPrice } = useSelector(
    (state: RootState) => state.products
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const classes = isOpen ? "open" : "close";

  const handleResetFilters = () => {
    dispatch(resetFilters({ min: minPrice, max: maxPrice }));
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
            <SideBarCategoriesList />
            <SideBarBrandsList />
            <SideBarRatingsList />
            <SideBarPriceRange />
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
