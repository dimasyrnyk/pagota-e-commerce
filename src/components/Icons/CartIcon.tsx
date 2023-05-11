import "./Icons.scss";
import basketIcon from "@assets/icons/basketIcon.svg";

type Props = {
  className?: string;
  productsCount?: number;
};

function CartIcon({ className, productsCount = 0 }: Props) {
  const classes = productsCount > 0 ? "not-empty" : "";

  return (
    <span className={className}>
      <span
        className={"icon-cart__container " + classes}
        data-count={productsCount}
      >
        <img
          src={basketIcon}
          alt="Cart icon"
        />
      </span>
    </span>
  );
}

export default CartIcon;
