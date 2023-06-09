import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./CartProductItem.scss";
import { AppDispatch, RootState } from "@store/index";
import { IProductDTO } from "@store/types/cart";
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "@store/products/actions";
import {
  changeProductUnit,
  removeProductFromCart,
  updateProductInCart,
} from "@store/cart/actions";
import {
  getConvertedQuantity,
  getNewTotalQuantity,
} from "@utils/order/quantity";
import heart from "@assets/icons/heartRedIcon.svg";
import heartFull from "@assets/icons/heartRedFullIcon.svg";
import InfoList from "@components/ProductInfo/InfoList/InfoList";
import Rating from "@components/Rating/Rating";
import SecondaryBtn from "@components/Buttons/SecondaryBtn/SecondaryBtn";
import OrderBlockInput from "@components/ProductInfo/OrderBlock/OrderBlockInput";
import CrossIcon from "@components/Icons/CrossIcon";
import ProductImage from "@components/ProductCard/ProductImage/ProductImage";
import ProductPrice from "@components/ProductCard/ProductPrice/ProductPrice";

type Props = {
  product: IProductDTO;
};

function CartProductItem({ product }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.cart.cart);
  const { wishListIds } = useSelector((state: RootState) => state.products);
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const [quantity, setQuantity] = useState<number>(product.quantity.amount);
  const [unit, setUnit] = useState<string>(product.quantity.unit);
  const productTotalQuantity = useMemo(
    () => getNewTotalQuantity(product.item, unit, false),
    [unit, quantity]
  );

  useEffect(() => {
    setQuantity(product.quantity.amount);
  }, [product.quantity.amount]);

  const isProductInWishList = () => {
    return wishListIds.find((id) => id === product.id);
  };

  const toggleWishList = () => {
    if (isProductInWishList()) {
      dispatch(removeProductFromWishlist(product.id));
    } else {
      dispatch(addProductToWishlist(product.id));
    }
  };

  const handleQuantity = (newQuantity: number) => {
    const newCartProduct = { ...product };
    newCartProduct.quantity.amount = newQuantity;

    setQuantity(newQuantity);
    dispatch(updateProductInCart(newCartProduct));
  };

  const handleUnit = (selectedUnit: string) => {
    const matchedProducts = products.filter((p) => p.id === product.id);
    const matchedUnits = matchedProducts.filter(
      (p) => p.quantity.unit === selectedUnit
    );
    const newQuantity = getConvertedQuantity(product, selectedUnit);
    const newCartQuantity = matchedUnits.length
      ? newQuantity + matchedUnits[0].quantity.amount
      : newQuantity;

    const newCartProduct = {
      id: product.id,
      item: product.item,
      quantity: {
        unit: selectedUnit,
        amount: newCartQuantity,
      },
    };

    if (matchedUnits.length) {
      const isConfirmedAction = window.confirm(
        "Do you really want to merge products?"
      );
      if (isConfirmedAction) {
        dispatch(updateProductInCart(newCartProduct));
        dispatch(removeProductFromCart(product));
        setUnit(selectedUnit);
      }
    } else {
      const changedProduct = { ...product };
      changedProduct.quantity.amount = newCartQuantity;
      dispatch(changeProductUnit(changedProduct, selectedUnit));
      setUnit(selectedUnit);
    }
  };

  const handleRemove = () => {
    dispatch(removeProductFromCart(product));
  };

  const productInfo = {
    "Farm:": product.item.producer,
    "Size:": product.item.size,
  };

  return (
    <div className="cart-item__container">
      <div className="cart-item__left-side">
        <ProductImage
          className="cart-item__image"
          product={product.item}
        />
        <SecondaryBtn
          className="cart-item__btn_remove"
          onClick={handleRemove}
        >
          <CrossIcon /> Remove
        </SecondaryBtn>
        {isAuth ? (
          <SecondaryBtn
            className="cart-item__btn_wishlist"
            onClick={toggleWishList}
          >
            <img
              src={isProductInWishList() ? heartFull : heart}
              alt="Heart icon"
            />
            Wishlist
          </SecondaryBtn>
        ) : null}
      </div>
      <div className="cart-item__right-side">
        <Link
          className="cart-item__link"
          to={"/products/" + product.item.id}
        >
          <h3>{product.item.title}</h3>
        </Link>
        <InfoList
          className="cart-item__info-list"
          info={productInfo}
        />
        <Rating
          rating={product.item.rating}
          isMonochrome={false}
        />
        <div className="cart-item__controls">
          <ProductPrice
            className="cart-item__price"
            price={product.item.quantity[unit].price}
            discount={product.item.discount}
            quantity={quantity}
          />
          <OrderBlockInput
            unit={unit}
            setUnit={handleUnit}
            quantity={quantity}
            setQuantity={handleQuantity}
            totalQuantity={productTotalQuantity}
            options={Object.keys(product.item.quantity)}
            className="cart-item__unit-input"
          />
        </div>
      </div>
    </div>
  );
}

export default CartProductItem;
