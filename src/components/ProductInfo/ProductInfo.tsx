import "./ProductInfo.scss";
import { WishListBtnTitle } from "@constants/app";
import { IProduct } from "@constants/products";
import Rating from "@components/Rating/Rating";
import WishListBtn from "@components/Buttons/WishListBtn/WishListBtn";
import InfoList from "./InfoList/InfoList";
import OrderBlock from "./OrderBlock/OrderBlock";
import TabsBlock from "./TabsBlock/TabsBlock";

type Props = {
  product: IProduct;
};

function ProductInfo({ product }: Props) {
  const reviewCount = product.reviews.length;

  const mainInfo = {
    "Country:": product?.country,
    "Category:": product?.category,
    "Stock:": product?.quantity.pcs ? "In Stok" : "Not avaliable",
    "Color:": product?.color,
    "Size:": product?.size,
    "Buy by:": Object.keys(product.price).join(", "),
    "Delivery:": `in ${product?.delivery.time} days`,
    "Delivery area:": product?.delivery.area,
  };

  return (
    <div className="product-info">
      <h2>{product.title}</h2>
      <div className="product-info__rating-block">
        <Rating
          rating={product.rating}
          isMonochrome={true}
        />
        <span className="product-info__rating-block_review">
          {reviewCount === 1 ? "(1 customer review)" : null}
          {reviewCount > 1 ? `(${reviewCount} customer reviews)` : null}
        </span>
      </div>
      <p className="product-info__short-description">
        {product.description.short}
      </p>
      <InfoList
        className="product-info__main-info"
        info={mainInfo}
      />
      <OrderBlock product={product} />
      <WishListBtn
        product={product}
        title={WishListBtnTitle.PRODUCT_PAGE}
      />
      <TabsBlock product={product} />
    </div>
  );
}

export default ProductInfo;
