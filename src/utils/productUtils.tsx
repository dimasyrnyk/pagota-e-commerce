import starBlackIcon from "@assets/icons/starBlackIcon.svg";
import starYellowIcon from "@assets/icons/starYellowIcon.svg";
import starBigWhiteIcon from "@assets/icons/starBigWhiteIcon.svg";
import starSmallWhiteIcon from "@assets/icons/starSmallWhiteIcon.svg";
import { ALL_CATEGORIES } from "@constants/app";
import { IProduct } from "@constants/products";
import { store } from "@store/index";

export type Brand = {
  name: string;
  category: string;
};

export function generateStars(
  intRating: number,
  isMonochrome: boolean
): JSX.Element[] {
  const fullStars = Array.from({ length: intRating }, (_, index) => (
    <img
      key={`star-${index}`}
      src={isMonochrome ? starBlackIcon : starYellowIcon}
      alt="Full star icon"
    />
  ));

  const emptyStars = Array.from({ length: 5 - intRating }, (_, index) => (
    <img
      key={`star-${intRating + index}`}
      src={isMonochrome ? starBigWhiteIcon : starSmallWhiteIcon}
      alt="Empty star icon"
    />
  ));

  return [...fullStars, ...emptyStars];
}

export function formatPrice(price: number) {
  return price.toFixed(2);
}

export function getCurrentPrice(productPrice: number, productDiscount: number) {
  return productPrice * ((100 - productDiscount) / 100);
}

export function getCategoryBrands(category: string) {
  const { brands } = store.getState().products;
  if (category === ALL_CATEGORIES) {
    return brands.map((brand: Brand) => brand.name);
  }
  return brands.reduce((acc: string[], brand: Brand) => {
    if (brand.category === category) {
      acc.push(brand.name);
    }
    return acc;
  }, []);
}

export function getCategoryLength(category: string) {
  const allProducts = store.getState().products.allProducts;
  if (category === ALL_CATEGORIES) {
    return allProducts.length;
  }
  return allProducts.filter((p: IProduct) => p.category === category).length;
}

export function getTransformedData(products: IProduct[]) {
  const uniqueBrands = new Map<string, Brand>();
  const uniqueCategories = new Set<string>();
  let minPrice = Infinity;
  let maxPrice = 0;

  products.forEach((product: IProduct) => {
    const productCurrentPrice = Math.round(
      product.price * ((100 - product.discount) / 100)
    );

    const brandKey = `${product.producer}-${product.category}`;
    if (!uniqueBrands.has(brandKey)) {
      uniqueBrands.set(brandKey, {
        name: product.producer,
        category: product.category,
      });
    }

    uniqueCategories.add(product.category);
    minPrice = Math.min(minPrice, productCurrentPrice);
    maxPrice = Math.max(maxPrice, productCurrentPrice);
  });

  return {
    products: products,
    categories: [...uniqueCategories],
    brands: [...uniqueBrands.values()],
    minPrice: minPrice - 1,
    maxPrice: maxPrice + 1,
  };
}
