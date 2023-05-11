import { Link } from "react-router-dom";

import "./HomePage.scss";
import Header from "@containers/Header/Header";
import Footer from "@containers/Footer/Footer";

function HomePage() {
  return (
    <>
      <Header />
      <div className="home-page__container">
        <h2>HomePage</h2>
        <Link to="/">HomePage</Link>
        <Link to="/cart">CartPage</Link>
        <Link to="/products">ProductsListPage</Link>
        <Link to="/products/id">ProductItemPage</Link>
        <Link to="*">NotFoundPage</Link>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
