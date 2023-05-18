import { IPrices } from "@store/types/filters";

export type Filters = {
  query?: string;
  category?: string;
  brands?: string[];
  ratings?: number[];
  prices?: IPrices;
  sort?: string;
};

export enum SortType {
  DEFAULT = "Default",
  TITLE_FROM_LOW = "Title from lowest",
  TITLE_FROM_HIGH = "Title from highest",
  PRICE_FROM_LOW = "Price from lowest",
  PRICE_FROM_HIGH = "Price from highest",
  RATING_FROM_LOW = "Rating from lowest",
  RATING_FROM_HIGH = "Rating from highest",
}
