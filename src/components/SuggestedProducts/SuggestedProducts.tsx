import { useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "./SuggestedProducts.scss";
import { RootState } from "@store/index";
import { carouselResponsive } from "@utils/products/carouselScreenSize";
import SuggestedProdctCard from "@components/SuggestedProductCard/SuggestedProductCard";
import ChevronDownIcon from "@components/Icons/ChevronDownIcon";

type Props = {
  category: string;
};

function SuggestedProducts({ category }: Props) {
  const { allProducts } = useSelector((state: RootState) => state.products);
  const categoryProducts = allProducts.filter((p) => p.category === category);

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
    <div className="suggested-products__container">
      <Carousel
        responsive={carouselResponsive}
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
  );
}

export default SuggestedProducts;
