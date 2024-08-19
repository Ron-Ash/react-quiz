export default function ProgressCounter({ total, currentQuestion, points }) {
  return (
    <>
      <p>
        {currentQuestion}/{total} questions finished, {points} Answered
        correctly
      </p>
    </>
  );
}
