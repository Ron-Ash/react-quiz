export default function ProgressCounter({ total, currentQuestion, points }) {
  return (
    <div className="progress">
      <p className="progress">
        {currentQuestion}/{total} questions finished, {points} Answered
        correctly
      </p>
    </div>
  );
}
