export default function ProgressCounter({
  totalQuestions,
  currentQuestion,
  totalPoints,
  points,
}) {
  return (
    <header className="progress">
      <progress max={totalQuestions} value={currentQuestion} />
      <p>
        Question <strong>{currentQuestion}</strong>/{totalQuestions}
      </p>
      <p>
        {" "}
        <strong>{points}</strong>/{totalPoints} points
      </p>
    </header>
  );
}
