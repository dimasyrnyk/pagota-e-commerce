import { useState } from "react";

import "./TabsBlock.scss";
import {
  FRESHNESECOM,
  ANSWERS_QUANTITY,
  IAnswer,
  IQuestion,
  ReviewBtn,
} from "@constants/products";

type Props = {
  question: IQuestion;
};

function QuestionItem({ question }: Props) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showedAnswers, setShowedAnswers] = useState<IAnswer[]>(
    question.answers.slice(0, ANSWERS_QUANTITY)
  );
  const isManyAnswers = question.answers.length > ANSWERS_QUANTITY;

  const getClasses = (author: string) => {
    return author === FRESHNESECOM ? "text__green" : "";
  };

  const handleShowMore = () => {
    if (isExpanded) {
      setShowedAnswers(question.answers.slice(0, ANSWERS_QUANTITY));
    } else {
      setShowedAnswers(question.answers);
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <li className="question-item">
      <div>
        <span className="review-item__author">{question.author}</span>
        <p className="review-item__text">{question.question}</p>
        <ul className="question-item__answers">
          {showedAnswers.map((answer) => (
            <li key={answer.id}>
              <span
                className={"review-item__author " + getClasses(answer.author)}
              >
                {answer.author}
              </span>
              <p>{answer.text}</p>
            </li>
          ))}
        </ul>
        {isManyAnswers && (
          <button
            className="question-item__show-more-btn"
            onClick={handleShowMore}
          >
            {isExpanded ? ReviewBtn.LESS : ReviewBtn.MORE}
          </button>
        )}
      </div>
    </li>
  );
}

export default QuestionItem;
