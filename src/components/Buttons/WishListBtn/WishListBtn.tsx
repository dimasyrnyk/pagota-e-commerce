import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@store/index";
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "@store/products/actions";
import { IProduct } from "@constants/products";
import HeartIcon from "@components/Icons/HeartIcon";
import HeartIconFull from "@components/Icons/HeartIconFull";
import SecondaryBtn from "../SecondaryBtn/SecondaryBtn";
import GoogleAuthModal from "@components/Modal/GoogleAuthModal/GoogleAuthModal";
import { ModalMessage } from "@constants/auth";
import { WishListBtnTitle } from "@constants/app";

type Props = {
  product: IProduct;
  title: string | JSX.Element;
  className?: string;
  disabled?: boolean;
};

function WishListBtn({ product, title, className, disabled }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const { wishListIds } = useSelector((state: RootState) => state.products);
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isProductInWishList = () => {
    return wishListIds.find((id) => id === product.id);
  };

  const handleToggleWishList = () => {
    if (isAuth) {
      if (isProductInWishList()) {
        dispatch(removeProductFromWishlist(product.id));
      } else {
        dispatch(addProductToWishlist(product.id));
      }
    } else {
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const btnTitle = {
    remove: (
      <>
        <HeartIconFull /> {WishListBtnTitle.REMOVE}
      </>
    ),
    add: (
      <>
        <HeartIcon /> {WishListBtnTitle.ADD_TO + title}
      </>
    ),
  };

  return (
    <div>
      <SecondaryBtn
        className={className}
        onClick={handleToggleWishList}
        disabled={disabled}
      >
        {isProductInWishList() ? btnTitle.remove : btnTitle.add}
      </SecondaryBtn>
      {isOpen ? (
        <GoogleAuthModal
          onClose={handleClose}
          message={ModalMessage.ACCESS_TO_WISH_LIST}
        />
      ) : null}
    </div>
  );
}

export default WishListBtn;
