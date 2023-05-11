import "./Icons.scss";
import basketIcon from "@assets/icons/basketIcon.svg";

type Props = {
  className?: string;
  productsCount?: number;
};

function CartIcon({ className, productsCount = 0 }: Props) {
  const classes = productsCount ? "not-empty" : "";

  return (
    <span
      className={"icon-cart__container " + classes}
      data-count={productsCount}
    >
      <img
        className={className}
        src={basketIcon}
        alt="Cart icon"
      />
    </span>
  );
}

export default CartIcon;
