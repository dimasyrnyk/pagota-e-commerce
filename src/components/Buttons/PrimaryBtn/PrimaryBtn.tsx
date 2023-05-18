import { PropsWithChildren } from "react";
import "./PrimaryBtn.scss";

type Props = {
  className?: string;
  title?: string | JSX.Element;
  disabled?: boolean;
  onClick?: () => void;
};

function PrimaryBtn({
  children,
  className,
  title,
  disabled,
  onClick,
}: PropsWithChildren<Props>) {
  return (
    <button
      className={"primary-btn " + className}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
      {children}
    </button>
  );
}

export default PrimaryBtn;
