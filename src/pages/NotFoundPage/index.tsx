import { Link } from "react-router-dom";

import "./NotFoundPage.scss";

function NotFoundPage() {
  return (
    <div className="not-found__container">
      <h2>NotFoundPage</h2>
      <Link to="/">HomePage</Link>
      <Link to="/cart">CartPage</Link>
      <Link to="/products">ProductsListPage</Link>
      <Link to="/products/id">ProductItemPage</Link>
      <Link to="*">NotFoundPage</Link>
    </div>
  );
}

export default NotFoundPage;
