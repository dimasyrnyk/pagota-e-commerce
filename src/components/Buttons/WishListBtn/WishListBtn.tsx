import { useDispatch, useSelector } from "react-redux";

import "./WishListBtn.scss";
import { AppDispatch, RootState } from "@store/index";
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "@store/products/actions";
import { IProduct } from "@constants/products";
import HeartIcon from "@components/Icons/HeartIcon";
import HeartIconFull from "@components/Icons/HeartIconFull";

type Props = {
  product: IProduct;
  className?: string;
  title: string | JSX.Element;
  disabled?: boolean;
};

function WishListBtn({ product, className, title, disabled }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const { wishList } = useSelector((state: RootState) => state.products);

  const isProductInWishList = () => {
    return wishList.find((item) => item.id === product.id);
  };

  const handleToggleWishList = () => {
    if (isProductInWishList()) {
      dispatch(removeProductFromWishlist(product.id));
    } else {
      dispatch(addProductToWishlist(product));
    }
  };

  return (
    <button
      className={"wishlist-btn " + className}
      onClick={handleToggleWishList}
      disabled={disabled}
    >
      {isProductInWishList() ? <HeartIconFull /> : <HeartIcon />}
      {title}
    </button>
  );
}

export default WishListBtn;
