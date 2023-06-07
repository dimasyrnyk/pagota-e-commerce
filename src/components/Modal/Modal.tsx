import { PropsWithChildren } from "react";
import "./Modal.scss";

type Props = {
  onClose?: () => void;
};

function Modal({ onClose, children }: PropsWithChildren<Props>) {
  return (
    <div>
      <div
        className="modal__overlay"
        onClick={onClose}
      ></div>
      <div className="modal__container">
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
