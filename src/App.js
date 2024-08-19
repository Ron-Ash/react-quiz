import { useEffect, useReducer, useState } from "react";
import "./App.css";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import QuestionScreen from "./QuestionScreen";
import FinishScreen from "./FinishScreen";
import ProgressCounter from "./ProgressCounter";

const initialState = {
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  questions: [],
  questionIndex: 0,
  points: 0,
};

function reducer(state, { action, newState }) {
  switch (action) {
    case "initialise":
      return initialState;
    case "recievedData":
      return { ...state, status: "ready", questions: newState.questions };
    case "dataFailed":
      return { ...state, status: "error" };
    case "startQuiz":
      return {
        ...state,
        status: "active",
        questionIndex: 0,
        points: 0,
      };
    case "moveForward":
      return {
        ...state,
        questionIndex: state.questionIndex + 1,
      };
    case "correctlyAnswered":
      return {
        ...state,
        points: state.points + state.questions[state.questionIndex].points,
      };
    case "finishQuiz":
      return { ...state, status: "finished" };
    default:
      throw new Error("Unknown action");
  }
}

function App() {
  const [{ status, questions, questionIndex, points }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        if (!res.ok) throw new Error("fetching failed");
        const data = await res.json();
        dispatch({ action: "recievedData", newState: { questions: data } });
      } catch (err) {
        console.log(err.message);
        return dispatch({ action: "dataFailed" });
      }
    }
    fetchQuestions();
  }, []);

  function handleStartQuiz() {
    if (status !== "ready" || questions.length <= 0) return;
    dispatch({ action: "startQuiz" });
  }

  function handleAnswerQuestion() {
    if (status !== "active") return;
    dispatch({ action: "correctlyAnswered" });
  }

  function handleNextQuestion() {
    if (status !== "active") return;
    if (questionIndex + 1 >= questions.length)
      dispatch({ action: "finishQuiz" });
    else dispatch({ action: "moveForward" });
  }

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            number={questions.length}
            handleStartQuizF={handleStartQuiz}
          />
        )}
        {status === "active" && (
          <>
            <ProgressCounter
              total={questions.length}
              currentQuestion={questionIndex + 1}
              points={points}
            />
            <QuestionScreen
              question={questions[questionIndex]}
              handleAnswerQuestionF={handleAnswerQuestion}
              handleNextQuestionF={handleNextQuestion}
            />
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
