import { IPrices } from "@store/types/filters";

export type Filters = {
  query?: string;
  category?: string;
  brands?: string[];
  ratings?: number[];
  prices?: IPrices;
};
