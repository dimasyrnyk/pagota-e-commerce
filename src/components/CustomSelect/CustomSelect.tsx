import "./CustomSelect.scss";
import { useState } from "react";
import ChevronDownIcon from "@components/Icons/ChevronDownIcon";

type Props = {
  title: string;
  options: string[];
  onChange: (category: string) => void;
};

function SearchBar({ title, options, onChange }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="custom-select__container">
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
            {options.map((option) => (
              <li
                className="custom-select__list-item"
                onClick={() => handleSelect(option)}
                key={Math.floor(Math.random() * 10000000)}
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
