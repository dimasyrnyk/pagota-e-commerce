import "./Icons.scss";
import heartWishListIcon from "@assets/icons/heartWishListIcon.svg";

type Props = {
  className?: string;
  productsCount?: number;
};

function HeartWishListIcon({ className, productsCount = 0 }: Props) {
  const classes = productsCount ? "not-empty" : "";

  return (
    <span
      className={"icon-cart__container " + classes}
      data-count={productsCount}
    >
      <img
        className={className}
        src={heartWishListIcon}
        alt="Heart wish list icon"
      />
    </span>
  );
}

export default HeartWishListIcon;
