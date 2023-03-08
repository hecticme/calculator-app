import { useReducer, useState } from "react";
import { useTheme } from "./contexts/ThemeContext";
import { ThemeSwitcher } from "./components/ThemeSwitcher";

const reducer = (state, action) => {
  switch (action.type) {
    case "add-digit":
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: action.payload,
        };
      } else if (action.payload == "0" && state.currentOperand == "0") {
        return state;
      } else if (action.payload == "." && state.currentOperand.includes(".")) {
        return state;
      } else {
        return {
          ...state,
          currentOperand: `${state.currentOperand || ""}${action.payload}`,
        };
      }
    case "del-digit":
      if (state.overwrite) {
        return {
          ...state,
          previousOperand: null,
        };
      } else if (state.currentOperand == null) {
        return state;
      } else if (state.currentOperand.length == 1) {
        return {
          ...state,
          currentOperand: null,
        };
      } else {
        return {
          ...state,
          currentOperand: state.currentOperand.slice(0, -1),
        };
      }
    case "choose-operation":
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      } else if (state.currentOperand == null) {
        return {
          ...state,
          operation: action.payload,
        };
      } else if (state.previousOperand == null) {
        return {
          ...state,
          previousOperand: state.currentOperand,
          operation: action.payload,
          currentOperand: null,
        };
      } else {
        return {
          ...state,
          previousOperand: evaluate(state),
          currentOperand: null,
          operation: action.payload,
        };
      }
    case "clear":
      return {};
    case "evaluate":
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
  }
};

const integerFormatter = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

function formatOperand(operand) {
  if (operand == null) {
    return;
  }
  const [integer, decimal] = operand.split(".");
  if (decimal == null) {
    return integerFormatter.format(integer);
  } else {
    return `${integerFormatter.format(integer)}.${decimal}`;
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "×":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }

  return computation.toString();
}

function App() {
  const [state, dispatch] = useReducer(reducer, {});
  const { theme } = useTheme();
  const [expandTheme, setExpandTheme] = useState(false);

  return (
    <div
      className="flex h-screen flex-col items-center justify-center font-mono"
      onClick={() => {
        setExpandTheme(false);
      }}
    >
      <ThemeSwitcher
        expandTheme={expandTheme}
        setExpandTheme={setExpandTheme}
      />
      <div className="grid grid-cols-[repeat(4,_minmax(3rem,_5rem))] grid-rows-[minmax(7rem,_auto)_repeat(5,_minmax(3rem,_5rem))] content-center justify-center gap-2 py-11 px-5 text-center">
        <div className="col-span-4 flex flex-col items-end rounded bg-gray-800 p-4 text-right dark:bg-zinc-700">
          <div className="break-all text-white" id="previous-operand">
            {formatOperand(state.previousOperand)} {state.operation}
          </div>
          <div
            className="break-all text-3xl font-bold text-white"
            id="current-operand"
          >
            {formatOperand(state.currentOperand)}
          </div>
        </div>
        <button
          className="flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 transition-colors hover:bg-slate-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-400"
          onClick={() => {
            dispatch({ type: "choose-operation", payload: "÷" });
          }}
        >
          ÷
        </button>
        <button
          className="flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 transition-colors hover:bg-slate-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-400"
          onClick={() => {
            dispatch({ type: "choose-operation", payload: "×" });
          }}
        >
          ×
        </button>
        <button
          className="flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 transition-colors hover:bg-slate-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-400"
          onClick={() => {
            dispatch({ type: "choose-operation", payload: "+" });
          }}
        >
          +
        </button>
        <button
          className="flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 transition-colors hover:bg-slate-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-400"
          onClick={() => {
            dispatch({ type: "choose-operation", payload: "-" });
          }}
        >
          -
        </button>
        <button
          className="flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 transition-colors hover:bg-slate-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-400"
          onClick={() => {
            dispatch({ type: "add-digit", payload: "7" });
          }}
        >
          7
        </button>
        <button
          className="flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 transition-colors hover:bg-slate-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-400"
          onClick={() => {
            dispatch({ type: "add-digit", payload: "8" });
          }}
        >
          8
        </button>
        <button
          className="flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 transition-colors hover:bg-slate-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-400"
          onClick={() => {
            dispatch({ type: "add-digit", payload: "9" });
          }}
        >
          9
        </button>
        <button
          className="flex cursor-pointer items-center justify-center rounded bg-orange-300 px-4 py-4 transition-colors hover:bg-orange-200 "
          onClick={() => {
            dispatch({ type: "del-digit" });
          }}
        >
          Del
        </button>
        <button
          className="flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 transition-colors hover:bg-slate-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-400"
          onClick={() => {
            dispatch({ type: "add-digit", payload: "4" });
          }}
        >
          4
        </button>
        <button
          className="flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 transition-colors hover:bg-slate-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-400"
          onClick={() => {
            dispatch({ type: "add-digit", payload: "5" });
          }}
        >
          5
        </button>
        <button
          className="flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 transition-colors hover:bg-slate-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-400"
          onClick={() => {
            dispatch({ type: "add-digit", payload: "6" });
          }}
        >
          6
        </button>
        <button
          className="flex cursor-pointer items-center justify-center rounded bg-red-400 px-4 py-4 transition-colors hover:bg-red-300"
          onClick={() => {
            dispatch({ type: "clear" });
          }}
        >
          AC
        </button>
        <button
          className="flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 transition-colors hover:bg-slate-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-400"
          onClick={() => {
            dispatch({ type: "add-digit", payload: "1" });
          }}
        >
          1
        </button>
        <button
          className="flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 transition-colors hover:bg-slate-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-400"
          onClick={() => {
            dispatch({ type: "add-digit", payload: "2" });
          }}
        >
          2
        </button>
        <button
          className="flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 transition-colors hover:bg-slate-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-400"
          onClick={() => {
            dispatch({ type: "add-digit", payload: "3" });
          }}
        >
          3
        </button>
        <button
          className="row-span-2 flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 hover:bg-slate-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-400"
          onClick={() => {
            dispatch({ type: "evaluate" });
          }}
        >
          =
        </button>
        <button
          className="col-span-2 flex cursor-pointer items-end justify-start rounded bg-slate-300 px-4 py-4 hover:bg-slate-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-400"
          onClick={() => {
            dispatch({ type: "add-digit", payload: "0" });
          }}
        >
          0
        </button>
        <button
          className="flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 hover:bg-slate-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-400"
          onClick={() => {
            dispatch({ type: "add-digit", payload: "." });
          }}
        >
          .
        </button>
      </div>
    </div>
  );
}

export default App;
