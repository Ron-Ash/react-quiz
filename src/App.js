import { useEffect, useReducer, useState } from "react";
import "./App.css";
import Header from "./Header";
import Main from "./Main";
import ProgressCounter from "./ProgressCounter";

const initialState = {
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  questions: [],
};

function reducer(state, { action, newState }) {
  switch (action) {
    case "initialise":
      return initialState;
    case "recievedData":
      return { ...state, status: "ready", questions: newState.questions };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      throw new Error("Unknown action");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

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

  return (
    <div className="app">
      <Header />
      <Main>
        <ProgressCounter />
      </Main>
    </div>
  );
}

export default App;
