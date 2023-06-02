import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./Header.scss";
import { RootState } from "@store/index";
import NavBar from "@components/NavBar/NavBar";
import SearchBar from "@components/SearchBar/SearchBar";
import CategoriesList from "@components/Categories/CategoriesList/CategoriesList";
import Breadcrumbs from "@components/BreadCrumbs/Breadcrumbs";
import ChatIcon from "@components/Icons/ChatIcon";
import UserIcon from "@components/Icons/UserIcon";
import CartIcon from "@components/Icons/CartIcon";
import Logo from "@components/Icons/Logo";

function Header() {
  const { products } = useSelector((state: RootState) => state.cart.cart);

  return (
    <div>
      <header className="header__container">
        <div className="header__first-row">
          <NavBar />
          <ChatIcon className="icon-mobile" />
          <UserIcon className="icon-mobile" />
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
              <UserIcon />
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
