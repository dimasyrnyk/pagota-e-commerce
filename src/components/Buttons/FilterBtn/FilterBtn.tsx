import "./FilterBtn.scss";
import filterIcon from "@assets/icons/filterIcon.svg";

type Props = {
  onClick: () => void;
};

function FilterBtn({ onClick }: Props) {
  return (
    <button
      className="filter-btn"
      onClick={onClick}
    >
      <img
        className="filter-btn__icon"
        src={filterIcon}
        alt="Filter icon"
      />
      Filters
    </button>
  );
}

export default FilterBtn;
