export default function QuestionScreen({ question }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <ul>
        {question.options.map((option, index) => (
          <li kye={index}>{option}</li>
        ))}
      </ul>
    </div>
  );
}
