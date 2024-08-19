export default function StartScreen({ number, handleStartQuizF }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{number} Questions to test your React Mastery!</h3>
      <button onClick={handleStartQuizF} className="btn btn-ui">
        Let's Start
      </button>
    </div>
  );
}
