import { useState } from "react";
import Timer from "./Timer";

export default function QuestionScreen({
  question,
  handleAnswerQuestionF,
  handleNextQuestionF,
  handleDecreaseTimeF,
  secondsRemaining,
}) {
  const [answered, setAnswered] = useState(false);

  function handleAnswerQuestion(index) {
    setAnswered(true);
    if (index !== question.correctOption) return;
    handleAnswerQuestionF();
  }

  function handleNextQuestion() {
    setAnswered(false);
    handleNextQuestionF();
  }

  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`btn btn-option ${
              answered
                ? index === question.correctOption
                  ? "answer correct"
                  : "wrong"
                : ""
            }`}
            disabled={answered}
            onClick={() => handleAnswerQuestion(index)}
          >
            {option}
          </button>
        ))}
      </div>
      <footer>
        <Timer
          handleDecreaseTimeFF={handleDecreaseTimeF}
          secondsRemaining={secondsRemaining}
        />
        {answered && (
          <button className="btn btn-ui" onClick={handleNextQuestion}>
            next
          </button>
        )}
      </footer>
    </div>
  );
}
