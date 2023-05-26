import "./TabsBlock.scss";
import { IQuestion } from "@constants/products";
import QuestionItem from "./QuestionItem";

type Props = {
  questions: IQuestion[];
};

function QuestionsList({ questions }: Props) {
  if (!questions.length) {
    return <div>There are no questions</div>;
  }

  return (
    <div className="tabs-block__questions-container">
      <ul className="tabs-block__questions">
        {questions.map((review) => (
          <QuestionItem
            key={review.id}
            question={review}
          />
        ))}
      </ul>
    </div>
  );
}

export default QuestionsList;
