import { useState } from "react";

import "./TabsBlock.scss";
import { DESCRIPTION_LENGTH, ReviewBtn } from "@constants/products";

type Props = {
  info: {
    [key: string]: string;
  };
};

function Description({ info }: Props) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const getTotalCharacterCount = () => {
    return Object.values(info).join("").length;
  };

  const truncateDescription = () => {
    let truncatedInfo: Record<string, string> = {};
    let characterCount = 0;

    for (const [key, value] of Object.entries(info)) {
      const valueLength = value.length;

      if (characterCount + valueLength <= DESCRIPTION_LENGTH) {
        truncatedInfo[key] = value;
        characterCount += valueLength;
      } else {
        const remainingCharacters = DESCRIPTION_LENGTH - characterCount;
        const truncatedValue = value.slice(0, remainingCharacters) + "...";
        truncatedInfo[key] = truncatedValue;
        break;
      }
    }

    return truncatedInfo;
  };

  const handleShowMore = () => {
    setIsExpanded(!isExpanded);
  };

  const isLargeText = getTotalCharacterCount() > DESCRIPTION_LENGTH;
  const displayedInfo = isExpanded ? info : truncateDescription();

  return (
    <div className="tabs-block__description-container">
      <ul className="tabs-block__description">
        {Object.entries(displayedInfo).map(([key, value]) => (
          <li
            className="description__item"
            key={key}
          >
            <h4 className="description__key">{key}</h4>
            <p className="description__value">{value}</p>
          </li>
        ))}

        {isLargeText && (
          <button
            className="review-item__show-more-btn"
            onClick={handleShowMore}
          >
            {isExpanded ? ReviewBtn.LESS : ReviewBtn.MORE}
          </button>
        )}
      </ul>
    </div>
  );
}

export default Description;
