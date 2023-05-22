import { PropsWithChildren } from "react";

import "./PrimaryBtn.scss";

type Props = {
  className?: string;
  title?: string | JSX.Element;
  disabled?: boolean;
  show?: boolean;
  onClick?: () => void;
};

function PrimaryBtn({
  children,
  className,
  title,
  disabled,
  show = true,
  onClick,
}: PropsWithChildren<Props>) {
  if (!show) {
    return null;
  }

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
