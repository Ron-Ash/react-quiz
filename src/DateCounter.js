import { useReducer } from "react";

const initialState = {
  count: 0,
  step: 1,
};

function reducer(state, { action, value }) {
  console.log(state, action);
  switch (action) {
    case "increase":
      return {
        ...state,
        count: state.count + value.count,
        step: state.step + value.step,
      };
    case "decrease":
      return {
        ...state,
        count: state.count - value.count,
        step: state.step - value.step,
      };
    case "set":
      return { ...state, count: value.count, step: value.step };
    default:
      throw new Error("Unknown action");
  }
}

function DateCounter() {
  const [{ count, step }, dispatch] = useReducer(reducer, initialState);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ action: "decrease", value: { count: step, step: 0 } });
  };

  const inc = function () {
    dispatch({ action: "increase", value: { count: step, step: 0 } });
  };

  const defineCount = function (e) {
    dispatch({
      action: "set",
      value: { count: Number(e.target.value), step: step },
    });
  };

  const defineStep = function (e) {
    dispatch({
      action: "set",
      value: { count: count, step: Number(e.target.value) },
    });
  };

  const reset = function () {
    dispatch({ action: "set", value: initialState });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
