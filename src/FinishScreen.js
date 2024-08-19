export default function FinishScreen({
  points,
  totalP,
  highscore,
  handleRestartF,
}) {
  return (
    <div>
      <div className="result">
        <span>
          You scored {points} out of {totalP} points (
          {((points / totalP) * 100) | 0}%)
        </span>
      </div>
      <p className="highscore">
        ({points >= highscore ? "NEW" : ""} Highscore: {highscore} points)
      </p>
      <button className="btn btn-ui" onClick={handleRestartF}>
        Restart Quiz
      </button>
    </div>
  );
}
