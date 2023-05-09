import { Link } from "react-router-dom";

import "./ProductsListPage.scss";

function ProductsListPage() {
  return (
    <div className="products-list__container">
      <h2>ProductsListPage</h2>
      <Link to="/">HomePage</Link>
      <Link to="/cart">CartPage</Link>
      <Link to="/products">ProductsListPage</Link>
      <Link to="/products/id">ProductItemPage</Link>
      <Link to="*">NotFoundPage</Link>
    </div>
  );
}

export default ProductsListPage;
