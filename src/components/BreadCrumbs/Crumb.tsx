import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Breadcrumbs.scss";
import { RootState } from "@store/index";
import { Crumbs } from "@constants/app";

type Props = {
  title: string;
  path: string;
  isLastCrumb: boolean;
};

function Crumb({ title, path, isLastCrumb }: Props) {
  const { id } = useParams();
  const { allProducts } = useSelector((state: RootState) => state.products);
  const product = id ? allProducts.find((p) => p.id === id) : null;
  const crumbsMap: { [key: string]: Crumbs } = Crumbs;

  if (isLastCrumb) {
    return product ? (
      <li>{product.title}</li>
    ) : (
      <li>{crumbsMap[title] || Crumbs.notFound}</li>
    );
  }

  if (!crumbsMap[title]) {
    return null;
  }

  return (
    <li>
      <Link to={path}>{crumbsMap[title]}</Link>
    </li>
  );
}

export default Crumb;
