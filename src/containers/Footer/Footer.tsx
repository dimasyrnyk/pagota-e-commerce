import "./Footer.scss";
import { Tags } from "src/mockData/mockData";
import FooterLink from "./Link";

function Footer() {
  return (
    <footer className="footer__container">
      <div className="footer__navbar">
        <div className="navbar__column">
          <h3>Get in touch</h3>
          <ul className="navbar__list">
            <FooterLink href="#">About Us</FooterLink>
            <FooterLink href="#">Career</FooterLink>
            <FooterLink href="#">Press Releases</FooterLink>
            <FooterLink href="#">Blog</FooterLink>
          </ul>
        </div>
        <div className="navbar__column">
          <h3>Connections</h3>
          <ul className="navbar__list">
            <FooterLink href="#">Facebook</FooterLink>
            <FooterLink href="#">Twitter</FooterLink>
            <FooterLink href="#">Instagram</FooterLink>
            <FooterLink href="#">Youtube</FooterLink>
            <FooterLink href="#">LinkedIn</FooterLink>
          </ul>
        </div>
        <div className="navbar__column">
          <h3>Earnings</h3>
          <ul className="navbar__list">
            <FooterLink href="#">Become an Affilate</FooterLink>
            <FooterLink href="#">Advertise your product</FooterLink>
            <FooterLink href="#">Sell on Market</FooterLink>
          </ul>
        </div>
        <div className="navbar__column">
          <h3>Account</h3>
          <ul className="navbar__list">
            <FooterLink href="#">Your account</FooterLink>
            <FooterLink href="#">Returns Center</FooterLink>
            <FooterLink href="#">100% purchase protection</FooterLink>
            <FooterLink href="#">Chat with us</FooterLink>
            <FooterLink href="#">Help</FooterLink>
          </ul>
        </div>
      </div>
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
