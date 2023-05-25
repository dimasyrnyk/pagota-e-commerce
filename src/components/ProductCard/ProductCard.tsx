import { Link } from "react-router-dom";

import "./ProductCard.scss";
import ChevronRightIcon from "@components/Icons/ChevronRightIcon";
import HeartIcon from "@components/Icons/HeartIcon";
import Rating from "@components/Rating/Rating";
import PrimaryBtn from "@components/Buttons/PrimaryBtn/PrimaryBtn";
import { formatPrice, getCurrentPrice } from "@utils/products/prices";
import { IProduct } from "@constants/products";
import WishListBtn from "@components/Buttons/WishListBtn/WishListBtn";
import { WishListBtnTitle } from "@constants/app";
import InfoList from "@components/ProductInfo/InfoList/InfoList";

type Props = {
  product: IProduct;
};

function ProductCard({ product }: Props) {
  const currentPrice = getCurrentPrice(product.price.pcs, product.discount);

  const productInfo = {
    "Fresheness:": (
      <>
        <span className="text_green">New</span> (Extra fresh){" "}
      </>
    ),
    "Farm:": product.producer,
    "Delivery:": product.delivery.area,
    "Stock:": (
      <span className="text_green">{`${product.quantity.pcs} pcs`}</span>
    ),
  };

  return (
    <li className="product-card__container">
      <Link
        className="product-card__image-link"
        to={"/products/" + product.id}
      >
        <img
          className="product-card__image"
          src={product.image}
          alt={product.title}
        />
      </Link>
      <div className="product-card__info">
        <div className="product-card__first-column">
          <Link to={"/products/" + product.id}>
            <h2 className="product-card__title">{product.title}</h2>
          </Link>
          <p className="product-card__small-description">
            {product.shortDescription}
          </p>
          <Rating rating={product.rating} />
          <div className="description__container">
            <InfoList info={productInfo} />
          </div>
        </div>
        <div className="product-card__second-column">
          <div className="product-card__payment-info">
            <div className="product-card__price">
              <h3 className="product-card__price-current">
                {formatPrice(currentPrice)} USD
              </h3>
              {product.discount ? (
                <span className="product-card__price-old">
                  {formatPrice(product.price.pcs)}
                </span>
              ) : null}
            </div>
            <div className="product-card__shipping">
              {!product.delivery.price ? (
                <span className="shipping_free">Free shipping</span>
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
