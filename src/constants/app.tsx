export const BASE_URL =
  "https://645b7a19a8f9e4d6e7699f11.mockapi.io/api/products";

export const ALL_CATEGORIES = "All categories";
export const SIDEBAR_RATING = [5, 4, 3, 2, 1];
export const SLIDER_STEP = 10;
export const CURRENT_PAGE = 1;
export const ITEMS_PER_PAGE = 5;
export const PAGE_NUMBER_LIMIT = 5;
export const MIN_PAGE_NUMBER_LIMIT = 0;
export const MAX_PAGE_NUMBER_LIMIT = 5;

export enum Crumbs {
  home = "Homepage",
  products = "All products",
  cart = "Cart",
  wishlist = "Wishlist",
  notFound = "Page not found",
}

export enum Prices {
  MIN = "min",
  MAX = "max",
}

export enum WishListBtnTitle {
  PRODUCT_CARD = "wish list",
  PRODUCT_PAGE = "my wish list",
}

export interface ILink {
  href: string;
  name: string;
}

export interface ILinkList {
  title: string;
  links: ILink[];
}

export const LINKSLIST: ILinkList[] = [
  {
    title: "Get in touch",
    links: [
      { href: "#", name: "About Us" },
      { href: "#", name: "Careers" },
      { href: "#", name: "Press Releases" },
      { href: "#", name: "Blog" },
    ],
  },
  {
    title: "Connections",
    links: [
      { href: "#", name: "Facebook" },
      { href: "#", name: "Twitter" },
      { href: "#", name: "Instagram" },
      { href: "#", name: "Youtube" },
      { href: "#", name: "LinkedIn" },
    ],
  },
  {
    title: "Earnings",
    links: [
      { href: "#", name: "Become an Affilate" },
      { href: "#", name: "Advertise your product" },
      { href: "#", name: "Sell on Market" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "#", name: "Your account" },
      { href: "#", name: "Returns Center" },
      { href: "#", name: "100% purchase protection" },
      { href: "#", name: "Chat with us" },
      { href: "#", name: "Help" },
    ],
  },
];
