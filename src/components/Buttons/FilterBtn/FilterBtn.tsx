import "./FilterBtn.scss";
import filterIcon from "@assets/icons/filterIcon.svg";
import PrimaryBtn from "../PrimaryBtn/PrimaryBtn";

type Props = {
  onClick: () => void;
};

function FilterBtn({ onClick }: Props) {
  return (
    <PrimaryBtn
      className="filter-btn"
      onClick={onClick}
    >
      <img
        className="filter-btn__icon"
        src={filterIcon}
        alt="Filter icon"
      />
      Filters
    </PrimaryBtn>
  );
}

export default FilterBtn;
