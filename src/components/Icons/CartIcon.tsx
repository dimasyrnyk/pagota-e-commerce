import "./Icons.scss";
import basketIcon from "@assets/icons/basketIcon.svg";

type Props = {
  className?: string;
  productsCount?: number;
};

function CartIcon({ className, productsCount = 0 }: Props) {
  const classes = productsCount > 0 ? "not-empty" : "";

  return (
    <div className={className}>
      <div
        className={"icon-cart__container " + classes}
        data-count={productsCount}
      >
        <img src={basketIcon} />
      </div>
    </div>
  );
}

export default CartIcon;
