import "./ImageBlock.scss";
import { IProduct } from "@constants/products";

type Props = {
  product: IProduct;
};

function ImageBlock({ product }: Props) {
  return (
    <div className="image-block">
      <img
        className="image-block__primary"
        src={product.image}
        alt={product.title}
      />
      <div className="image-block__container">
        <img
          className="image-block__secondary"
          src={product.image}
          alt={product.title}
        />
        <img
          className="image-block__secondary"
          src={product.image}
          alt={product.title}
        />
      </div>
    </div>
  );
}

export default ImageBlock;
