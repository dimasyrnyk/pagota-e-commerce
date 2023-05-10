import { useState } from "react";

import "./CategoryItem.scss";
import DropDown from "../DropDown/DropDown";
import ChevronDownIcon from "@components/Icons/ChevronDownIcon";

const brands = [
  {
    id: "ef345564ryt5454",
    name: "Brand name 1",
  },
  {
    id: "effdfd56fgf",
    name: "Brand name 2",
  },
  {
    id: "efret34vbn5645dsf",
    name: "Brand name 3",
  },
];

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

      {isHovered && <DropDown brands={brands} />}
    </li>
  );
}

export default CategoryItem;
