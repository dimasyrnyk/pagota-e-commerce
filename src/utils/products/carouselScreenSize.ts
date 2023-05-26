import { ItemsPerPage, screenWidth } from "@constants/products";

export const carouselResponsive = {
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
