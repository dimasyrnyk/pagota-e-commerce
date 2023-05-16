import { useState } from "react";
import { useSelector } from "react-redux";

import "./CategoryItem.scss";
import DropDown from "../DropDown/DropDown";
import ChevronDownIcon from "@components/Icons/ChevronDownIcon";
import { RootState } from "@store/index";
import { IProduct } from "@constants/products";

type Props = {
  category: string;
};

function CategoryItem({ category }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const { allProducts } = useSelector((state: RootState) => state.products);
  const categoryBrands = allProducts.reduce(
    (acc: string[], product: IProduct) => {
      if (product.category === category) {
        acc.push(product.producer);
      }
      return acc;
    },
    []
  );

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

      {isHovered && <DropDown brands={categoryBrands} />}
    </li>
  );
}

export default CategoryItem;
