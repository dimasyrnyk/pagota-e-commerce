import "./CustomSelect.scss";
import { Categories } from "@constants/categories";
import { useState } from "react";
import ChevronDownIcon from "@components/Icons/ChevronDownIcon";

const options = ["All categories"].concat(Object.values(Categories));

function SearchBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSelect = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <div className="custom-select__container">
      <div className="custom-select__body">
        <h4
          onClick={toggleOpen}
          className="custom-select__header"
        >
          {selectedOption || "All categories"}
          <ChevronDownIcon />
        </h4>
        {isOpen && (
          <ul className="custom-select__list">
            {options.map((option) => (
              <li
                className="custom-select__list-item"
                onClick={() => handleSelect(option)}
                key={Math.random()}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
