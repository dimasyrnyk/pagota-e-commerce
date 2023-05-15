import CrossIcon from "@components/Icons/CrossIcon";
import "./CloseBtn.scss";

type Props = {
  onClick: () => void;
};

function CloseBtn({ onClick }: Props) {
  return (
    <button
      className="close-btn"
      onClick={onClick}
    >
      <CrossIcon className="close-btn__icon" />
    </button>
  );
}

export default CloseBtn;
