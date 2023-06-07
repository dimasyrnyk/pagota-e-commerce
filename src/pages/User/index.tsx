import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

import "./User.scss";
import { AppDispatch, RootState } from "@store/index";
import { userLogOut } from "@store/auth/actions";
import { updateBillingInfo } from "@store/cart/actions";
import Header from "@containers/Header/Header";
import Footer from "@containers/Footer/Footer";
import PrimaryBtn from "@components/Buttons/PrimaryBtn/PrimaryBtn";
import SecondaryBtn from "@components/Buttons/SecondaryBtn/SecondaryBtn";

function User() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleClick = () => {
    navigate("/wishlist");
  };

  const logOut = () => {
    googleLogout();
    dispatch(userLogOut());
    dispatch(updateBillingInfo({ firstName: "" }));
    dispatch(updateBillingInfo({ lastName: "" }));
    dispatch(updateBillingInfo({ email: "" }));
  };

  return (
    <>
      <Header />
      <div className="user-page__container">
        <img
          className="user-page__image"
          src={user?.picture}
          alt="User avatar"
        />
        <h3>{user?.name}</h3>
        <p>{user?.email}</p>
        <div className="user-page__btn-block">
          <PrimaryBtn onClick={handleClick}>My wish list</PrimaryBtn>
          <SecondaryBtn
            className="user-page__btn"
            onClick={logOut}
          >
            Log out
          </SecondaryBtn>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default User;
