import { useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "./SuggestedProdcts.scss";
import { RootState } from "@store/index";
import SuggestedProdctCard from "@components/SuggestedProductCard/SuggestedProductCard";
import ChevronDownIcon from "@components/Icons/ChevronDownIcon";
import { ItemsPerPage, screenWidth } from "@constants/products";

type Props = {
  category: string;
};

function SuggestedProdcts({ category }: Props) {
  const { allProducts } = useSelector((state: RootState) => state.products);
  const categoryProducts = allProducts.filter((p) => p.category === category);

  const responsive = {
    superLargeDesktop: {
      breakpoint: screenWidth.LARGE_DESKTOP,
      items: ItemsPerPage.LARGE_DESKTOP,
    },
    desktop: {
      breakpoint: screenWidth.DESKTOP,
      items: ItemsPerPage.DESKTOP,
    },
    tablet: {
      breakpoint: screenWidth.TABLET,
      items: ItemsPerPage.TABLET,
    },
    mobile: {
      breakpoint: screenWidth.MOBILE,
      items: ItemsPerPage.MOBILE,
    },
  };

  const ButtonGroup = ({ next, previous }: any) => {
    return (
      <div className="suggested-products__header">
        <span>You will maybe love</span>
        <div className="suggested-products__controls">
          <ChevronDownIcon
            className="suggested-products__btn-prev"
            onClick={() => previous()}
          />
          <span>More products</span>
          <ChevronDownIcon
            className="suggested-products__btn-next"
            onClick={() => next()}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="suggested-products__container">
        <Carousel
          responsive={responsive}
          infinite={true}
          arrows={false}
          renderButtonGroupOutside={true}
          customButtonGroup={<ButtonGroup />}
        >
          {categoryProducts.map((product) => (
            <SuggestedProdctCard
              key={product.id}
              product={product}
            />
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default SuggestedProdcts;
