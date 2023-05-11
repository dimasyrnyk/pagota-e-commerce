import "./Footer.scss";
import { Tags } from "src/mockData/mockData";
import FooterNavBar from "@components/FooterNavBar/FooterNavBar";

function Footer() {
  return (
    <footer className="footer__container">
      <FooterNavBar />
      <div className="footer__second-row">
        <h3>Product tags</h3>
        <ul className="tags__container">
          {Tags.map((tag) => (
            <li
              className="tags__item"
              key={tag + Math.floor(Math.random() * 10000000)}
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
