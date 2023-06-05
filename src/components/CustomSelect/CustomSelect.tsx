import { useState } from "react";

import "./CustomSelect.scss";
import ChevronDownIcon from "@components/Icons/ChevronDownIcon";

type Props = {
  className: string;
  title: string;
  options: string[];
  activeOption: string;
  onChange: (category: string) => void;
};

function SearchBar({
  className,
  title,
  options,
  activeOption,
  onChange,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSelect = (value: string) => {
    if (value !== title) {
      onChange(value);
    }
    setIsOpen(false);
  };

  const getClasses = (item: string) => {
    return item === activeOption ? "active" : "";
  };

  return (
    <div className={"custom-select__container " + className}>
      <div className="custom-select__body">
        <h4
          onClick={toggleOpen}
          className="custom-select__header"
        >
          {title}
          <ChevronDownIcon />
        </h4>
        {isOpen && (
          <ul className="custom-select__list">
            {options.map((option, index) => (
              <li
                key={index}
                className={"custom-select__list-item " + getClasses(option)}
                onClick={() => handleSelect(option)}
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
