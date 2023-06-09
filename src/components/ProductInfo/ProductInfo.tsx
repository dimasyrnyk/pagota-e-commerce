import "./ProductInfo.scss";
import { WishListBtnTitle } from "@constants/app";
import { IProduct } from "@constants/products";
import { getReviewText } from "@utils/products/review";
import Rating from "@components/Rating/Rating";
import WishListBtn from "@components/Buttons/WishListBtn/WishListBtn";
import InfoList from "./InfoList/InfoList";
import OrderBlock from "./OrderBlock/OrderBlock";
import TabsBlock from "./TabsBlock/TabsBlock";
import CartInfo from "./CartInfo/CartInfo";

type Props = {
  product: IProduct;
};

function ProductInfo({ product }: Props) {
  const reviewCount = product.reviews.length;
  const reviewText = getReviewText(reviewCount);

  const mainInfo = {
    "Country:": product?.country,
    "Category:": product?.category,
    "Stock:": product?.quantity.pcs ? "In Stok" : "Not avaliable",
    "Color:": product?.color,
    "Size:": product?.size,
    "Buy by:": Object.keys(product.quantity).join(", "),
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
        <span className="product-info__rating-block_review">{reviewText}</span>
      </div>
      <p className="product-info__short-description">
        {product.description.short}
      </p>
      <InfoList
        className="product-info__main-info"
        info={mainInfo}
      />
      <OrderBlock product={product} />
      <CartInfo product={product} />
      <WishListBtn
        product={product}
        title={WishListBtnTitle.PRODUCT_PAGE}
      />
      <TabsBlock product={product} />
    </div>
  );
}

export default ProductInfo;
