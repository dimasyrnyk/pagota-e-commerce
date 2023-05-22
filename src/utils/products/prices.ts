export function formatPrice(price: number) {
  return price.toFixed(2);
}

export function getCurrentPrice(productPrice: number, productDiscount: number) {
  return productPrice * ((100 - productDiscount) / 100);
}
