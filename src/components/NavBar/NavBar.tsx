import { useState } from "react";

import "./NavBar.scss";
import { ReactComponent as BarsIcon } from "@assets/icons/barsIcon.svg";

function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <label
        className="navbar__checkbox"
        htmlFor="navbar__checkbox"
      >
        <BarsIcon />
      </label>
      <input
        id="navbar__checkbox"
        type="checkbox"
        name="navbar__checkbox"
        onChange={handleOpen}
        checked={isOpen}
      />
      <nav className="navbar__container">
        <ul className="navbar__contacts">
          <li className="navbar__chat">
            <a href="#">Chat wit us</a>
          </li>
          <li>
            <a href="tel:+420336775664">+420 336 775 664</a>
          </li>
          <li>
            <a href="mailto:info@freshnesecom.com">info@freshnesecom.com</a>
          </li>
        </ul>
        <ul className="navbar__navigation">
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Careers</a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
