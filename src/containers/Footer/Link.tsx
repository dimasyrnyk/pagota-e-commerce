import { PropsWithChildren } from "react";

import "./Footer.scss";

type Props = {
  href: string;
};

function FooterLink({ href, children }: PropsWithChildren<Props>) {
  return (
    <li>
      <a
        href={href}
        className="link__item"
      >
        {children}
      </a>
    </li>
  );
}

export default FooterLink;
