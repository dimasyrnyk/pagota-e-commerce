import { useEffect, useState } from "react";

import "./Pagination.scss";
import PrimaryBtn from "@components/Buttons/PrimaryBtn/PrimaryBtn";
import ChevronDownIcon from "@components/Icons/ChevronDownIcon";
import ProductsQuantity from "@components/ProductsQuantity/ProductsQuantity";
import PaginationButton from "./PaginationButton";
import { IProduct } from "@constants/products";
import {
  CURRENT_PAGE,
  ITEMS_PER_PAGE,
  MAX_PAGE_NUMBER_LIMIT,
  MIN_PAGE_NUMBER_LIMIT,
  PAGE_NUMBER_LIMIT,
} from "@constants/app";

type Props = {
  products: IProduct[];
  setProducts: (products: IProduct[]) => void;
};

function Pagination({ products, setProducts }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(CURRENT_PAGE);
  const [itemsPerPage, setItemsPerPage] = useState<number>(ITEMS_PER_PAGE);

  const [pageNumberLimit, setPageNumberLimit] =
    useState<number>(PAGE_NUMBER_LIMIT);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState<number>(
    MAX_PAGE_NUMBER_LIMIT
  );
  const [minPageNumberLimit, setMinPageNumberLimit] = useState<number>(
    MIN_PAGE_NUMBER_LIMIT
  );

  const pagesCount = Math.ceil(products.length / itemsPerPage);
  const pages: number[] = Array.from(
    { length: pagesCount },
    (_, index) => index + 1
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const isLastPage = indexOfLastItem >= products.length;

  const scrollToTop = () => {
    if (window.scrollY !== 0) {
      window.scrollTo(0, window.scrollY - 20);
      setTimeout(scrollToTop, 10);
    }
  };

  useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(CURRENT_PAGE);
    setItemsPerPage(ITEMS_PER_PAGE);
    setMaxPageNumberLimit(MAX_PAGE_NUMBER_LIMIT);
    setMinPageNumberLimit(MIN_PAGE_NUMBER_LIMIT);
  }, [products.length]);

  useEffect(() => {
    setProducts(currentItems);
  }, [currentPage, itemsPerPage, products]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const element = e.target as HTMLElement;
    const id = element.getAttribute("id") as string;
    setCurrentPage(+id);
  };

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
      ((currentPage - 1) * itemsPerPage) / (itemsPerPage + ITEMS_PER_PAGE) + 1
    );
    const newPagesCount = Math.ceil(
      products.length / (itemsPerPage + ITEMS_PER_PAGE)
    );
    setCurrentPage(newPage < newPagesCount ? newPage : newPagesCount);
    setItemsPerPage(itemsPerPage + ITEMS_PER_PAGE);

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
