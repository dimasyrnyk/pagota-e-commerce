import { Link } from "react-router-dom";

import "./SuggestedProdctCard.scss";
import { IProduct } from "@constants/products";
import { formatPrice, getCurrentPrice } from "@utils/products/prices";
import PrimaryBtn from "@components/Buttons/PrimaryBtn/PrimaryBtn";

type Props = {
  product: IProduct;
};

function SuggestedProdctCard({ product }: Props) {
  const currentPrice = getCurrentPrice(product.price.pcs, product.discount);

  return (
    <div className="suggested-product">
      <span className="suggested-product__discount">
        {product.discount ? <span>- {product.discount} %</span> : null}
      </span>
      <Link to={"/products/" + product.id}>
        <img
          className="suggested-product__img"
          src={product.image}
          alt={product.title}
        />
      </Link>
      <div>
        <h4 className="suggested-product__title">{product.title}</h4>
        <p className="suggested-product__description">
          {product.description.short}
        </p>
      </div>
      <div className="suggested-product__price-block">
        <div className="suggested-product__price">
          <h3 className="suggested-product__price-current">
            {formatPrice(currentPrice)} USD
          </h3>
          {product.discount ? (
            <span className="suggested-product__price-old">
              {formatPrice(product.price.pcs)}
            </span>
          ) : null}
        </div>
        <PrimaryBtn>Buy now</PrimaryBtn>
      </div>
    </div>
  );
}

export default SuggestedProdctCard;
