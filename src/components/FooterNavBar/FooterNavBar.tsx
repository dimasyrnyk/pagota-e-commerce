import "./FooterNavBar.scss";
import FooterLink from "./FooterLink";
import { LINKSLIST } from "@constants/app";

function FooterNavBar() {
  return (
    <div className="footer-navbar">
      {LINKSLIST.map((item) => (
        <div
          className="footer-navbar__column"
          key={item.title}
        >
          <h3>{item.title}</h3>
          <ul className="footer-navbar__list">
            {item.links.map((link) => (
              <FooterLink
                key={link.name}
                href={link.href}
              >
                {link.name}
              </FooterLink>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default FooterNavBar;
