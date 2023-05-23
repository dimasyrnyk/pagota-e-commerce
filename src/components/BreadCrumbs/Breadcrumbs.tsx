import { Link, useLocation } from "react-router-dom";

import "./Breadcrumbs.scss";
import Crumb from "./Crumb";
import { Crumbs } from "@constants/app";

function Breadcrumbs() {
  const location = useLocation();
  let currentLink = "";
  const crumbs = location.pathname
    .split("/")
    .filter((path) => path !== "")
    .map((crumb, index, arr) => {
      currentLink += `/${crumb}`;

      return (
        <Crumb
          key={index}
          title={crumb}
          path={currentLink}
          isLastCrumb={index === arr.length - 1}
        />
      );
    });
  const isHome = crumbs.length === 0;

  return (
    <nav>
      <ul className="breadcrumbs__container">
        <li>{isHome ? Crumbs.home : <Link to="/">{Crumbs.home}</Link>}</li>
        {crumbs}
      </ul>
    </nav>
  );
}

export default Breadcrumbs;
