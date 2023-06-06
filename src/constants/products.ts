export interface IReview {
  id: string;
  rating: number;
  author: string;
  date: string;
  text: string;
}

export interface IAnswer {
  id: string;
  author: string;
  text: string;
}

export interface IQuestion {
  id: string;
  author: string;
  question: string;
  answers: IAnswer[];
}

export interface IQuantity {
  pcs: {
    value: number;
    price: number;
    proportion: 1;
  };
  [key: string]: {
    value: number;
    price: number;
    proportion: number;
  };
}

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
  quantity: IQuantity;
  discount: number;
  description: {
    short: string;
    full: {
      [key: string]: string;
    };
  };
  reviews: IReview[];
  questions: IQuestion[];
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
export const DESCRIPTION_LENGTH = 800;
export const REVIEW_QUANTITY = 3;
export const REVIEW_TEXT_LENGTH = 200;
export const ANSWERS_QUANTITY = 1;
export const FRESHNESECOM = "Freshnesecom";

export enum Tabs {
  DESCRIPTION = "Description",
  REVIEWS = "Reviews",
  QUESTIONS = "Questions",
}

export enum ReviewBtn {
  MORE = "read more",
  LESS = "read less",
}

export const screenWidth = {
  MOBILE: { max: 600, min: 0 },
  TABLET: { max: 900, min: 601 },
  DESKTOP: { max: 1200, min: 901 },
  LARGE_DESKTOP: { max: 4000, min: 1201 },
};

export enum ItemsPerPage {
  MOBILE = 1,
  TABLET = 2,
  DESKTOP = 3,
  LARGE_DESKTOP = 4,
}
