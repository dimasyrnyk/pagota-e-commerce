import { Link } from "react-router-dom";

import "./HomePage.scss";
import Header from "@containers/Header/Header";
import Footer from "@containers/Footer/Footer";
import PrimaryBtn from "@components/Buttons/PrimaryBtn/PrimaryBtn";

function HomePage() {
  return (
    <>
      <Header />
      <div className="home-page__container">
        <p>
          Welcome to our vibrant e-commerce site, where your shopping journey
          begins. Click on the "Get Started" button to unlock a world of
          incredible products, and seamless shopping experiences. Whether you're
          searching for trendy fashion, cutting-edge gadgets, stylish home
          decor, or thoughtful gifts, our curated selection has something for
          everyone.
          <br />
          <br />
          By clicking "Get Started," you embark on a thrilling adventure of
          exploration and convenience. Enjoy the convenience of browsing through
          our user-friendly categories, where you'll find an extensive range of
          high-quality products carefully sourced from trusted sellers. Discover
          the latest trends, and indulge in your passions with just a few
          clicks.
          <br />
          <br />
          With our secure and hassle-free checkout process, you can shop with
          confidence, knowing that your personal information is protected. Our
          dedicated customer support team is always ready to assist you,
          ensuring a smooth and enjoyable shopping experience from start to
          finish.
          <br />
          <br />
          Join our community of satisfied customers and experience the joy of
          shopping online. Whether you're a fashion enthusiast, a tech geek, a
          home decor aficionado, or simply someone looking for great deals, our
          e-commerce site is your ultimate destination.
          <br />
          <br />
          Click{" "}
          <Link to="/products">
            <PrimaryBtn title="Get Started" />
          </Link>{" "}
          now and let the shopping adventure begin!
        </p>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
