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
