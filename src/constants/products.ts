export interface IProduct {
  title: string;
  image: string;
  category: string;
  country: number;
  color: string;
  size: string;
  producer: string;
  delivery: {
    area: string;
    time: number;
    price: number;
  };
  quantity: {
    pcs: number;
    [key: string]: number;
  };
  price: {
    pcs: number;
    [key: string]: number;
  };
  discount: number;
  shortDescription: string;
  fullDescription: string;
  reviews: [];
  question: [];
  rating: number;
  id: string;
}

export type Brand = {
  name: string;
  category: string;
};

export const INITIAL_QUANTITY = 1;
export const INITIAL_UNIT = "pcs";
export const ERROR_DELAY = 3000;
