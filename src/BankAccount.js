import { useReducer } from "react";

const initialState = {
  accountOpened: false,
  balance: 0,
  loan: 0,
  loanIssued: false,
};

function reducer(state, { action, newState }) {
  switch (action) {
    case "openAccount":
      return state.accountOpened
        ? { ...state }
        : { ...initialState, balance: 500, accountOpened: true };
    case "deposit":
      return { ...state, balance: state.balance + (newState?.deposit ?? 0) };
    case "withdraw":
      return { ...state, balance: state.balance - (newState?.withdraw ?? 0) };
    case "requestLoan":
      const loanAmount = newState?.loan ?? 0;
      return state.loanIssued || loanAmount <= 0
        ? { ...state }
        : {
            ...state,
            loanIssued: true,
            loan: state.loan + loanAmount,
            balance: state.balance + loanAmount,
          };
    case "payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanIssued: false,
      };
    case "closeAccount":
      return state.balance === 0 && state.loan === 0 && state.accountOpened
        ? { ...state, accountOpened: false }
        : { ...state };
    default:
      throw new Error("unknown action");
  }
}

export default function BankAccount() {
  const [{ accountOpened, balance, loan, loanIssued }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>
      <button
        style={accountOpened ? { backgroundColor: "orangered" } : {}}
        onClick={() => dispatch({ action: "openAccount" })}
      >
        open account
      </button>
      <button
        onClick={() =>
          dispatch({ action: "deposit", newState: { deposit: 150 } })
        }
      >
        deposit 150
      </button>
      <button
        onClick={() =>
          dispatch({ action: "withdraw", newState: { withdraw: 50 } })
        }
      >
        withdraw 50
      </button>
      <button
        style={loanIssued ? { backgroundColor: "orangered" } : {}}
        onClick={() =>
          dispatch({ action: "requestLoan", newState: { loan: 5000 } })
        }
      >
        Request loan (5000)
      </button>
      <button onClick={() => dispatch({ action: "payLoan" })}>Pay loan</button>
      <button
        style={accountOpened ? {} : { backgroundColor: "orangered" }}
        onClick={() => dispatch({ action: "closeAccount" })}
      >
        Close account
      </button>
    </div>
  );
}
