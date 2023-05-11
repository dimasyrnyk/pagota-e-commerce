import "./ProductsList.scss";
import ProductCard from "@components/ProductCard/ProductCard";
import { IProduct } from "@constants/products";

type Props = {
  products: IProduct[];
};

function ProductsList({ products }: Props) {
  if (!products.length) {
    return <center>No products found</center>;
  }

  return (
    <>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </>
  );
}

export default ProductsList;
