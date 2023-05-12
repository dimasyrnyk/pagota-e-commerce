import "./ProductCard.scss";
import ChevronRightIcon from "@components/Icons/ChevronRightIcon";
import HeartIcon from "@components/Icons/HeartIcon";
import Rating from "@components/Rating/Rating";
import { Link } from "react-router-dom";

type Props = {
  product: any;
};

function ProductCard({ product }: Props) {
  const currentPrice = product.price * ((100 - product.discount) / 100);

  return (
    <div className="product-card__container">
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
            <ul className="description__keys">
              <li>Fresheness</li>
              <li>Farm</li>
              <li>Delivery</li>
              <li>Stock</li>
            </ul>
            <ul className="description__values">
              <li>
                <span className="text__green">New</span> (Extra fresh)
              </li>
              <li>{product.producer}</li>
              <li>{product.deliveryArea}</li>
              <li className="description__values_green">{product.quantity}</li>
            </ul>
          </div>
        </div>
        <div className="product-card__second-column">
          <div className="product-card__payment-info">
            <div className="product-card__price">
              <h3 className="product-card__price-current">
                {currentPrice.toFixed(2)} USD
              </h3>
              <span className="product-card__price-old">
                {product.price.toFixed(2)}
              </span>
            </div>
            <div className="product-card__shipping">
              <span>Free Shipping</span>
              <span>Delivery in {product.delivery} days</span>
            </div>
          </div>
          <Link to={"/products/" + product.id}>
            <button className="product-card__btn-detail">
              Product Detail <ChevronRightIcon />
            </button>
          </Link>
          <button className="product-card__btn-wish-list">
            <HeartIcon />
            Add to wish list
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
