import { Link } from "react-router-dom";

import "./ProductCard.scss";
import { IProduct } from "@constants/products";
import { WishListBtnTitle } from "@constants/app";
import ChevronRightIcon from "@components/Icons/ChevronRightIcon";
import PrimaryBtn from "@components/Buttons/PrimaryBtn/PrimaryBtn";
import WishListBtn from "@components/Buttons/WishListBtn/WishListBtn";
import InfoList from "@components/ProductInfo/InfoList/InfoList";
import Rating from "@components/Rating/Rating";
import ProductImage from "@components/ProductCard/ProductImage/ProductImage";
import ProductPrice from "./ProductPrice/ProductPrice";

type Props = {
  product: IProduct;
};

function ProductCard({ product }: Props) {
  const productInfo = {
    "Fresheness:": (
      <>
        <span className="text_green">New</span> (Extra fresh){" "}
      </>
    ),
    "Farm:": product.producer,
    "Delivery:": product.delivery.area,
    "Stock:": (
      <span className="text_green">{`${product.quantity.pcs.value} pcs`}</span>
    ),
  };

  return (
    <li className="product-card__container">
      <ProductImage
        className="product-card__image"
        product={product}
      />
      <div className="product-card__info">
        <div className="product-card__first-column">
          <Link to={"/products/" + product.id}>
            <h2 className="product-card__title">{product.title}</h2>
          </Link>
          <p className="product-card__small-description">
            {product.description.short}
          </p>
          <Rating rating={product.rating} />
          <div className="description__container">
            <InfoList info={productInfo} />
          </div>
        </div>
        <div className="product-card__second-column">
          <div className="product-card__payment-info">
            <ProductPrice
              price={product.quantity.pcs.price}
              discount={product.discount}
            />
            <div className="product-card__shipping">
              {!product.delivery.price ? (
                <span className="font_600">Free shipping</span>
              ) : null}
              <span>Delivery in {product.delivery.time} days</span>
            </div>
          </div>
          <Link to={"/products/" + product.id}>
            <PrimaryBtn className="product-card__btn-detail">
              Product Detail <ChevronRightIcon />
            </PrimaryBtn>
          </Link>
          <WishListBtn
            className="product-card__btn-wish-list"
            product={product}
            title={WishListBtnTitle.PRODUCT_CARD}
          />
        </div>
      </div>
    </li>
  );
}

export default ProductCard;
