import "./DropDown.scss";

type Props = {
  brands: any[];
};

function DropDown({ brands }: Props) {
  return (
    <ul className="dropdown__container">
      {brands.map((brand) => (
        <li
          key={brand.id}
          className="dropdown__title"
        >
          {brand.name}
        </li>
      ))}
    </ul>
  );
}

export default DropDown;
