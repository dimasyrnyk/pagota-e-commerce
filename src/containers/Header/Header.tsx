import "./Header.scss";
import SearchBar from "@components/SearchBar/SearchBar";
import CategoriesList from "@components/Categories/CategoriesList/CategoriesList";
import BreadCrumbs from "@components/BreadCrumbs/BreadCrumbs";
import NavBar from "@components/NavBar/NavBar";
import { ReactComponent as Logo } from "@assets/icons/logo.svg";
import ChatIcon from "@components/Icons/ChatIcon";
import UserIcon from "@components/Icons/UserIcon";
import CartIcon from "@components/Icons/CartIcon";

function Header() {
  return (
    <header className="header__container">
      <div className="header__first-row">
        <NavBar />
        <ChatIcon className="icon-mobile" />
        <UserIcon className="icon-mobile" />
        <CartIcon
          className="icon-mobile"
          productsCount={4}
        />
      </div>
      <div className="header__second-row">
        <div className="main-section__container">
          <Logo className="main-section__logo" />
          <SearchBar />
          <span className="main-section__user-profile">
            <UserIcon />
            <CartIcon productsCount={4} />
          </span>
        </div>
        <CategoriesList />
      </div>
      <BreadCrumbs />
    </header>
  );
}

export default Header;
