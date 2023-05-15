import "./ProductsQuantity.scss";

type Props = {
  quantity: number;
};

function ProductsQuantity({ quantity }: Props) {
  return <span className="products-quantity">{quantity}</span>;
}

export default ProductsQuantity;
