import { PropsWithChildren } from "react";

import "./SecondaryBtn.scss";

type Props = {
  className?: string;
  title?: string | JSX.Element;
  disabled?: boolean;
  show?: boolean;
  onClick?: () => void;
};

function SecondaryBtn({
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
      className={"secondary-btn " + className}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
      {children}
    </button>
  );
}

export default SecondaryBtn;
