import { PropsWithChildren } from "react";

import "./FooterNavBar.scss";

type Props = {
  href: string;
};

function FooterLink({ href, children }: PropsWithChildren<Props>) {
  return (
    <li>
      <a
        href={href}
        className="footer-navbar__item"
      >
        {children}
      </a>
    </li>
  );
}

export default FooterLink;
