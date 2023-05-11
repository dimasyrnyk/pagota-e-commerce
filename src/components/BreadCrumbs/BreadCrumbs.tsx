import "./BreadCrumbs.scss";

function BreadCrumbs() {
  return (
    <div className="breadcrumbs__container">
      <a href="#">Homepage</a>/
      <a
        href="#"
        className="disabled-link"
      >
        All products
      </a>
    </div>
  );
}

export default BreadCrumbs;
