import { PropsWithChildren } from "react";

import "./PrimaryBtn.scss";

type Props = {
  className?: string;
  title?: string | JSX.Element;
  disabled?: boolean;
  show?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  onSubmit?: () => void;
};

function PrimaryBtn({
  children,
  className,
  title,
  disabled,
  show = true,
  type,
  onClick,
  onSubmit,
}: PropsWithChildren<Props>) {
  if (!show) {
    return null;
  }

  return (
    <button
      className={"primary-btn " + className}
      onClick={onClick}
      onSubmit={onSubmit}
      disabled={disabled}
      type={type}
    >
      {title}
      {children}
    </button>
  );
}

export default PrimaryBtn;
