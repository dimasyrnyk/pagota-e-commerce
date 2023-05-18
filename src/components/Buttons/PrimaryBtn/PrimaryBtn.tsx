import { PropsWithChildren } from "react";
import "./PrimaryBtn.scss";

type Props = {
  className?: string;
  title?: string | JSX.Element;
  onClick?: () => void;
};

function PrimaryBtn({
  children,
  className,
  title,
  onClick,
}: PropsWithChildren<Props>) {
  return (
    <button
      className={"app-btn " + className}
      onClick={onClick}
    >
      {title}
      {children}
    </button>
  );
}

export default PrimaryBtn;
