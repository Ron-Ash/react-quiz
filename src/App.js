import { useEffect, useReducer, useState } from "react";
import "./App.css";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import QuestionScreen from "./QuestionScreen";
import FinishScreen from "./FinishScreen";

const initialState = {
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  questions: [],
  questionIndex: 0,
  correctlyAnswered: 0,
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
        correctlyAnswered: 0,
      };
    default:
      throw new Error("Unknown action");
  }
}

function App() {
  const [{ status, questions, questionIndex, correctlyAnswered }, dispatch] =
    useReducer(reducer, initialState);

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
          <QuestionScreen question={questions[questionIndex]} />
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
