import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import "./SearchBar.scss";
import { updateFilters } from "@store/filters/actions";
import { AppDispatch, RootState } from "@store/index";
import { getNewFilters } from "@utils/filters/filterProducts";
import { updateUrl } from "@utils/filters/searchParams";
import { IProduct } from "@constants/products";

type Props = {
  show: boolean;
  setShow: (showBrands: boolean) => void;
  query: string;
  setQuery: (searchQuery: string) => void;
};

function SearchBarProductSelect({ show, setShow, query, setQuery }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const { allProducts } = useSelector((state: RootState) => state.products);
  const [showedProducts, setShowedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const updatedProducts = allProducts
      .filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 10);
    setShowedProducts(updatedProducts);
  }, [query]);

  const handleProductSelect = (selectedProduct: IProduct) => {
    const newFilters = getNewFilters({
      category: selectedProduct.category,
      brands: [selectedProduct.producer],
    });
    dispatch(updateFilters(newFilters));
    updateUrl(newFilters, navigate, location);
    navigate(`/products/${selectedProduct.id}`);
    setShow(false);
    setQuery("");
  };

  if (!show) {
    return null;
  }

  return (
    <ul className="search-bar__brands-list">
      {showedProducts.map((product) => (
        <li
          className="search-bar__brands-list-item"
          onClick={() => handleProductSelect(product)}
          key={product.id}
        >
          <span className="item__name">{product.title}</span>
          <span className="item__category">
            <span className="text-small">category</span>
            {product.category}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default SearchBarProductSelect;
