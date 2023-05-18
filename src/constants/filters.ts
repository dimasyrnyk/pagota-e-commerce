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
  TITLE_FROM_LOW = "Title A-Z",
  TITLE_FROM_HIGH = "Title Z-A",
  PRICE_FROM_LOW = "Price low-high",
  PRICE_FROM_HIGH = "Price high-low",
  RATING_FROM_LOW = "Rating low-high",
  RATING_FROM_HIGH = "Rating high-low",
}
