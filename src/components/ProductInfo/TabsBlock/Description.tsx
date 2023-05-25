import { useState } from "react";

import "./TabsBlock.scss";

type Props = {
  info: {
    [key: string]: string;
  };
};

function Description({ info }: Props) {
  return (
    <ul className="tabs-block__description">
      {Object.entries(info).map(([key, value]) => (
        <li
          className="description__item"
          key={key}
        >
          <h4 className="description__key">{key}</h4>
          <p className="description__value">{value}</p>
        </li>
      ))}
    </ul>
  );
}

export default Description;
