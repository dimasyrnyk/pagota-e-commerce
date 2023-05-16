import { Link } from "react-router-dom";

import "./ProductCard.scss";
import ChevronRightIcon from "@components/Icons/ChevronRightIcon";
import HeartIcon from "@components/Icons/HeartIcon";
import Rating from "@components/Rating/Rating";
import { IProduct } from "@constants/products";
import { formatPrice, getCurrentPrice } from "@utils/productUtils";
import AppBtn from "@components/Buttons/AppBtn/AppBtn";

type Props = {
  product: IProduct;
};

function ProductCard({ product }: Props) {
  const currentPrice = getCurrentPrice(product.price, product.discount);

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
            <ul className="description__list">
              <li className="description__row">
                <span className="description__label">Fresheness:</span>
                <span className="description__value">
                  <span className="text__green">New</span> (Extra fresh)
                </span>
              </li>
              <li className="description__row">
                <span className="description__label">Farm:</span>
                <span className="description__value">{product.producer}</span>
              </li>
              <li className="description__row">
                <span className="description__label">Delivery:</span>
                <span className="description__value">
                  {product.deliveryArea}
                </span>
              </li>
              <li className="description__row">
                <span className="description__label">Stock:</span>
                <span className="description__value">
                  <span className="text__green">{product.quantity}</span>
                </span>
              </li>
            </ul>
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
                  {formatPrice(product.price)}
                </span>
              ) : null}
            </div>
            <div className="product-card__shipping">
              <span>Free Shipping</span>
              <span>Delivery in {product.delivery} days</span>
            </div>
          </div>
          <Link to={"/products/" + product.id}>
            <AppBtn className="product-card__btn-detail">
              Product Detail <ChevronRightIcon />
            </AppBtn>
          </Link>
          <button className="product-card__btn-wish-list">
            <HeartIcon />
            Add to wish list
          </button>
        </div>
      </div>
    </li>
  );
}

export default ProductCard;
