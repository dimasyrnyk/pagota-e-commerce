import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./WishList.scss";
import { AppDispatch, RootState } from "@store/index";
import {
  getWishListCartProducts,
  removeProductFromWishlist,
} from "@store/products/actions";
import trashIcon from "@assets/icons/trashIcon.svg";
import Header from "@containers/Header/Header";
import Footer from "@containers/Footer/Footer";
import SuggestedProdctCard from "@components/SuggestedProductCard/SuggestedProductCard";
import PrimaryBtn from "@components/Buttons/PrimaryBtn/PrimaryBtn";
import AppLoader from "@components/AppLoader/AppLoader";

function WishList() {
  const dispatch: AppDispatch = useDispatch();
  const { wishListIds, wishListItems, isLoading } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(getWishListCartProducts(wishListIds));
  }, []);

  const handleRemove = (productId: string) => {
    dispatch(removeProductFromWishlist(productId));
  };

  const RenderEmptyWishlist = () => {
    if (!wishListItems.length && !isLoading) {
      return (
        <div className="wish-list__empty">
          <h3>Your wishlist is empty</h3>
          <Link to="/products">
            <PrimaryBtn title="Go to products" />
          </Link>
        </div>
      );
    }
  };

  const RenderWishlist = () => {
    if (wishListItems.length) {
      return (
        <div className="wish-list__body">
          {wishListItems.map((product) => (
            <div
              className="wish-list__item"
              key={product.id}
            >
              <SuggestedProdctCard product={product} />
              <button
                className="wish-list__btn-remove"
                onClick={() => handleRemove(product.id)}
              >
                remove
              </button>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <>
      <Header />
      <div className="wish-list__container">
        {RenderEmptyWishlist()}

        {isLoading ? <AppLoader /> : RenderWishlist()}
      </div>
      <Footer />
    </>
  );
}

export default WishList;
