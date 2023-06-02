import "./TabsBlock.scss";
import { Tabs } from "@constants/products";
import ProductsQuantity from "@components/ProductsQuantity/ProductsQuantity";

type Props = {
  activeTab: string;
  tabName: string;
  handleClick: (tabName: string) => void;
  reviewCount: number;
  questionCount: number;
};

function ProductTab({
  activeTab,
  tabName,
  handleClick,
  reviewCount,
  questionCount,
}: Props) {
  const classes = "product__tab" + (activeTab === tabName ? " active" : "");
  const showReviewCount = reviewCount && tabName === Tabs.REVIEWS;
  const showQuestionCount = questionCount && tabName === Tabs.QUESTIONS;

  function handleTabClick() {
    handleClick(tabName);
  }

  return (
    <li
      className={classes}
      onClick={handleTabClick}
    >
      {tabName}
      {showReviewCount ? <ProductsQuantity quantity={reviewCount} /> : null}
      {showQuestionCount ? <ProductsQuantity quantity={questionCount} /> : null}
    </li>
  );
}

export default ProductTab;
