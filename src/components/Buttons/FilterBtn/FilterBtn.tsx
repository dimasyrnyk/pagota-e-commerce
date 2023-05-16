import AppBtn from "../AppBtn/AppBtn";
import "./FilterBtn.scss";
import filterIcon from "@assets/icons/filterIcon.svg";

type Props = {
  onClick: () => void;
};

function FilterBtn({ onClick }: Props) {
  return (
    <AppBtn
      className="filter-btn"
      onClick={onClick}
    >
      <img
        className="filter-btn__icon"
        src={filterIcon}
        alt="Filter icon"
      />
      Filters
    </AppBtn>
  );
}

export default FilterBtn;
