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
        <div className="suggested-product__description">
          {product.description.short}
        </div>
      </div>
      <div className="suggested-product__price-block">
        <span className="suggested-product__price">
          {formatPrice(currentPrice)} USD
        </span>
        <PrimaryBtn>Buy now</PrimaryBtn>
      </div>
    </div>
  );
}

export default SuggestedProdctCard;
