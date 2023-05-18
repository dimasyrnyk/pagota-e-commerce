import "./Header.scss";
import SearchBar from "@components/SearchBar/SearchBar";
import CategoriesList from "@components/Categories/CategoriesList/CategoriesList";
import BreadCrumbs from "@components/BreadCrumbs/BreadCrumbs";
import NavBar from "@components/NavBar/NavBar";
import ChatIcon from "@components/Icons/ChatIcon";
import UserIcon from "@components/Icons/UserIcon";
import CartIcon from "@components/Icons/CartIcon";
import { Link } from "react-router-dom";
import Logo from "@components/Icons/Logo";

function Header() {
  return (
    <header className="header__container">
      <div className="header__first-row">
        <NavBar />
        <ChatIcon className="icon-mobile" />
        <UserIcon className="icon-mobile" />
        <span className="icon-mobile">
          <Link to="/cart">
            <CartIcon productsCount={4} />
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
              <CartIcon productsCount={4} />
            </Link>
          </div>
        </div>
        <CategoriesList />
      </div>
      <BreadCrumbs />
    </header>
  );
}

export default Header;
