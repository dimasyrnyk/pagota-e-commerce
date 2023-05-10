import "./Footer.scss";

const tags = [
  "Beans",
  "Carrots",
  "Apples",
  "Garlic",
  "Mushrooms",
  "Tomatoes",
  "Chilli pepers",
  "Broccoli",
  "Watermelons",
  "Oranges",
  "Bananas",
  "Grapes",
  "Cherries",
  "Meat",
  "Seo tag",
  "Fish",
  "Seo tag",
  "Fresh food",
  "Lemons",
];

function Footer() {
  return (
    <footer className="footer__container">
      <div className="footer__navbar">
        <div className="navbar__column">
          <h3>Get in touch</h3>
          <ul className="navbar__list">
            <li className="navbar__item">About Us</li>
            <li className="navbar__item">Career</li>
            <li className="navbar__item">Press Releases</li>
            <li className="navbar__item">Blog</li>
          </ul>
        </div>
        <div className="navbar__column">
          <h3>Connections</h3>
          <ul className="navbar__list">
            <li className="navbar__item">Facebook</li>
            <li className="navbar__item">Twitter</li>
            <li className="navbar__item">Instagram</li>
            <li className="navbar__item">Youtube</li>
            <li className="navbar__item">LinkedIn</li>
          </ul>
        </div>
        <div className="navbar__column">
          <h3>Earnings</h3>
          <ul className="navbar__list">
            <li className="navbar__item">Become an Affilate</li>
            <li className="navbar__item">Advertise your product</li>
            <li className="navbar__item">Sell on Market</li>
          </ul>
        </div>
        <div className="navbar__column">
          <h3>Account</h3>
          <ul className="navbar__list">
            <li className="navbar__item">Your account</li>
            <li className="navbar__item">Returns Center</li>
            <li className="navbar__item">100% purchase protection</li>
            <li className="navbar__item">Chat with us</li>
            <li className="navbar__item">Help</li>
          </ul>
        </div>
      </div>
      <div className="footer__second-row">
        <h3>Product tags</h3>
        <ul className="tags__container">
          {tags.map((tag) => (
            <li
              className="tags__item"
              key={tag + Math.random() * 100}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <span className="tags__copyright">Copyright © 2020 petrbilek.com</span>
    </footer>
  );
}

export default Footer;
