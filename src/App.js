import "./App.css";
import Header from "./Header";
import Main from "./Main";
import ProgressCounter from "./ProgressCounter";

function App() {
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
