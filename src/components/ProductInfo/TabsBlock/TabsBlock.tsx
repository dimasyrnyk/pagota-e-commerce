import { useState } from "react";

import "./TabsBlock.scss";
import { IProduct, Tabs } from "@constants/products";
import ProductTab from "./ProductTab";
import Description from "./Description";
import ReviewsList from "./ReviewsList";
import QuestionsList from "./QuestionsList";

type Props = {
  product: IProduct;
};

function TabsBlock({ product }: Props) {
  const [activeTab, setActiveTab] = useState<string>(Tabs.DESCRIPTION);

  function handleTabClick(tab: string) {
    setActiveTab(tab);
  }

  const tabsComonents: { [key: string]: JSX.Element } = {
    [Tabs.DESCRIPTION]: <Description info={product.description.full} />,
    [Tabs.REVIEWS]: <ReviewsList reviews={product.reviews} />,
    [Tabs.QUESTIONS]: <QuestionsList questions={product.questions} />,
  };

  return (
    <div className="tabs-block__container">
      <ul className="tabs-block">
        {Object.values(Tabs).map((tabName) => (
          <ProductTab
            key={tabName}
            tabName={tabName}
            activeTab={activeTab}
            handleClick={handleTabClick}
            reviewCount={product.reviews.length}
            questionCount={product.questions.length}
          />
        ))}
      </ul>
      {tabsComonents[activeTab]}
    </div>
  );
}

export default TabsBlock;
