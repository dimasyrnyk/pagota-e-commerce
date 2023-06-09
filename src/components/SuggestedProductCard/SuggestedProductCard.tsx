import { Link } from "react-router-dom";

import "./SuggestedProdctCard.scss";
import { IProduct } from "@constants/products";
import PrimaryBtn from "@components/Buttons/PrimaryBtn/PrimaryBtn";
import ProductImage from "@components/ProductCard/ProductImage/ProductImage";
import ProductPrice from "@components/ProductCard/ProductPrice/ProductPrice";

type Props = {
  product: IProduct;
};

function SuggestedProdctCard({ product }: Props) {
  return (
    <div className="suggested-product">
      <span className="suggested-product__discount">
        {product.discount ? <span>- {product.discount} %</span> : null}
      </span>
      <ProductImage
        className="suggested-product__img"
        product={product}
      />
      <div>
        <h4 className="suggested-product__title">{product.title}</h4>
        <p className="suggested-product__description">
          {product.description.short}
        </p>
      </div>
      <div className="suggested-product__price-block">
        <ProductPrice
          price={product.quantity.pcs.value}
          discount={product.discount}
        />
        <Link to={"/products/" + product.id}>
          <PrimaryBtn>Buy now</PrimaryBtn>
        </Link>
      </div>
    </div>
  );
}

export default SuggestedProdctCard;
