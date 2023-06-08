import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "./Header.scss";
import { RootState } from "@store/index";
import NavBar from "@components/NavBar/NavBar";
import SearchBar from "@components/SearchBar/SearchBar";
import CategoriesList from "@components/Categories/CategoriesList/CategoriesList";
import Breadcrumbs from "@components/BreadCrumbs/Breadcrumbs";
import UserIcon from "@components/Icons/UserIcon";
import CartIcon from "@components/Icons/CartIcon";
import Logo from "@components/Icons/Logo";
import HeartWishListIcon from "@components/Icons/HeartWishListIcon";
import GoogleAuthModal from "@components/Modal/GoogleAuthModal/GoogleAuthModal";

function Header() {
  const navigate = useNavigate();
  const { products } = useSelector((state: RootState) => state.cart.cart);
  const { wishListIds } = useSelector((state: RootState) => state.products);
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = (path: string) => {
    if (isAuth) {
      navigate(path);
    } else {
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <header className="header__container">
        {isOpen ? <GoogleAuthModal onClose={handleClose} /> : null}
        <div className="header__first-row">
          <NavBar />
          <span
            className="icon-mobile"
            onClick={() => handleClick("/wihlist")}
          >
            <HeartWishListIcon
              className="icon-mobile"
              productsCount={wishListIds.length}
            />
          </span>
          <UserIcon
            className="icon-mobile"
            onClick={() => handleClick("/user")}
          />
          <span className="icon-mobile">
            <Link to="/cart">
              <CartIcon productsCount={products.length} />
            </Link>
          </span>
        </div>
        <div className="header__second-row">
          <div className="main-section__container">
            <Link to="/">
              <Logo className="main-section__logo" />
            </Link>
            <SearchBar />
            <div className="main-section__user-profile">
              <UserIcon onClick={() => handleClick("/user")} />
              <span>
                <HeartWishListIcon
                  onClick={() => handleClick("/wihlist")}
                  productsCount={wishListIds.length}
                />
              </span>
              <Link to="/cart">
                <CartIcon productsCount={products.length} />
              </Link>
            </div>
          </div>
          <CategoriesList />
        </div>
      </header>
      <Breadcrumbs />
    </div>
  );
}

export default Header;
