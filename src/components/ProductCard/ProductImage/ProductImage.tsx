import { Link } from "react-router-dom";

import "./ProductImage.scss";
import { IProduct } from "@constants/products";

type Props = {
  product: IProduct;
  className?: string;
};

function ProductImage({ product, className = "" }: Props) {
  return (
    <Link
      to={"/products/" + product.id}
      className="product__image-link"
    >
      <img
        className={"product__image " + className}
        src={product.image}
        alt={product.title}
      />
    </Link>
  );
}

export default ProductImage;
