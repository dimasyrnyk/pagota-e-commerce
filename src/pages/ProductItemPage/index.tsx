import { Link } from "react-router-dom";

import "./ProductItemPage.scss";

function ProductItemPage() {
  return (
    <div className="products-item__container">
      <h2>ProductItemPage</h2>
      <Link to="/">HomePage</Link>
      <Link to="/cart">CartPage</Link>
      <Link to="/products">ProductsListPage</Link>
      <Link to="/products/id">ProductItemPage</Link>
      <Link to="*">NotFoundPage</Link>
    </div>
  );
}

export default ProductItemPage;
