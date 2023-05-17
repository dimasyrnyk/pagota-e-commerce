export interface IProduct {
  title: string;
  image: string;
  category: string;
  country: number;
  color: string;
  size: string;
  producer: string;
  delivery: number;
  deliveryArea: string;
  quantity: number;
  price: number;
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
