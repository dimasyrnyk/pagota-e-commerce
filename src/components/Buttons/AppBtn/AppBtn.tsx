import { PropsWithChildren } from "react";
import "./AppBtn.scss";

type Props = {
  className?: string;
  title?: string | JSX.Element;
  onClick?: () => void;
};

function AppBtn({
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

export default AppBtn;
