import { useState } from "react";

import "./CategoryItem.scss";
import DropDown from "../DropDown/DropDown";
import ChevronDownIcon from "@components/Icons/ChevronDownIcon";
import { Brands } from "src/mockData/mockData";

type Props = {
  category: string;
};

function CategoryItem({ category }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <li
      className="category-item"
      onMouseLeave={handleMouseLeave}
    >
      <span
        className="category-item__title"
        onMouseEnter={handleMouseEnter}
      >
        {category}
        <ChevronDownIcon className="category-item__icon" />
      </span>

      {isHovered && <DropDown brands={Brands} />}
    </li>
  );
}

export default CategoryItem;
