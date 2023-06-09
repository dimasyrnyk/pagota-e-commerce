import "./InfoList.scss";

type Props = {
  info: Record<string, number | string | JSX.Element | undefined>;
  className?: string;
};

function InfoList({ className = "", info }: Props) {
  return (
    <ul className={"info-list " + className}>
      {Object.entries(info).map(([key, value]) => (
        <li
          className="info-list__item"
          key={key}
        >
          <span className="info-list__key">{key}</span>
          <span className="info-list__value">{value}</span>
        </li>
      ))}
    </ul>
  );
}

export default InfoList;
