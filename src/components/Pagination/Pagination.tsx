import { useEffect, useState } from "react";

import "./Pagination.scss";
import PrimaryBtn from "@components/Buttons/PrimaryBtn/PrimaryBtn";
import ChevronDownIcon from "@components/Icons/ChevronDownIcon";
import ProductsQuantity from "@components/ProductsQuantity/ProductsQuantity";
import PaginationButton from "./PaginationButton";
import { IProduct } from "@constants/products";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";

type Props = {
  products: IProduct[];
  setProducts: (products: IProduct[]) => void;
};

function Pagination({ products, setProducts }: Props) {
  const { sort } = useSelector((state: RootState) => state.filters);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const [pageNumberLimit, setPageNumberLimit] = useState<number>(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState<number>(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState<number>(0);

  useEffect(() => {
    setCurrentPage(1);
    setItemsPerPage(5);
    setMaxPageNumberLimit(5);
    setMinPageNumberLimit(0);
  }, [products.length]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const element = e.target as HTMLElement;
    const id = element.getAttribute("id") as string;
    setCurrentPage(+id);
  };

  const pagesCount = Math.ceil(products.length / itemsPerPage);
  const pages: number[] = Array.from(
    { length: pagesCount },
    (_, index) => index + 1
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const isLastPage = indexOfLastItem >= products.length;

  useEffect(() => {
    setProducts(currentItems);
  }, [currentPage, itemsPerPage, products]);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={`${number}`}
          className={currentPage === number ? "active" : ""}
          onClick={handleClick}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = (pageAmount: number) => {
    const isPage = currentPage + pageAmount < pagesCount;
    setCurrentPage(isPage ? currentPage + pageAmount : pagesCount);

    if (currentPage + pageAmount > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = (pageAmount: number) => {
    setCurrentPage(currentPage - pageAmount);

    if (currentPage - pageAmount <= minPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <li onClick={() => handleNextbtn(pageNumberLimit)}> &hellip; </li>
    );
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <li onClick={() => handlePrevbtn(pageNumberLimit)}> &hellip; </li>
    );
  }

  const handleLoadMore = () => {
    const newPage = Math.ceil(
      ((currentPage - 1) * itemsPerPage) / (itemsPerPage + 5) + 1
    );
    const newPagesCount = Math.ceil(products.length / (itemsPerPage + 5));
    setCurrentPage(newPage < newPagesCount ? newPage : newPagesCount);
    setItemsPerPage(itemsPerPage + 5);

    if (newPage <= minPageNumberLimit && minPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  return (
    <div className="paginate__container">
      <div className="paginate">
        <span>Page:</span>
        <ul className="paginate__pages">
          <PaginationButton
            title="<"
            show={currentPage !== pages[0]}
            onClick={() => handlePrevbtn(1)}
          />
          {pageDecrementBtn}
          {renderPageNumbers}
          {pageIncrementBtn}
          <PaginationButton
            title=">"
            show={currentPage !== pagesCount}
            onClick={() => handleNextbtn(1)}
          />
        </ul>
      </div>
      <PrimaryBtn
        className="load-more__button"
        show={!isLastPage}
        onClick={handleLoadMore}
      >
        Show more products
        <ChevronDownIcon className="button-icon" />
      </PrimaryBtn>
      <div className="products-list__quantity">
        <ProductsQuantity quantity={itemsPerPage} />
        <span>Products</span>
      </div>
    </div>
  );
}

export default Pagination;
