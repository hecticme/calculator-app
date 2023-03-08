import { useReducer, useState } from "react";
import { useTheme } from "./contexts/ThemeContext";
import { ThemeSwitcher } from "./components/ThemeSwitcher";

const reducer = (state, action) => {
  switch (action.type) {
    case "addDigit":
    case "delDigit":
    case "clear":
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, {});
  const { theme } = useTheme();
  const [expandTheme, setExpandTheme] = useState(false);

  return (
    <div
      className={`flex h-screen flex-col items-center justify-center font-mono ${
        theme === "dark" ? "dark" : ""
      }`}
      onClick={() => {
        setExpandTheme(false);
      }}
    >
      <ThemeSwitcher
        expandTheme={expandTheme}
        setExpandTheme={setExpandTheme}
      />
      <div className="grid grid-cols-[repeat(4,_minmax(3rem,_5rem))] grid-rows-[minmax(7rem,_auto)_repeat(5,_minmax(3rem,_5rem))] content-center justify-center gap-2 py-11 px-5 text-center">
        <div className="col-span-4 flex flex-col items-end rounded bg-gray-800 px-2 py-4 text-right">
          <div className="break-all text-white" id="previous-operand">
            {state.previousOperand} {state.operation}
          </div>
          <div
            className="break-all text-3xl font-bold text-white"
            id="current-operand"
          >
            {state.currentOperand}
          </div>
        </div>
        <div className="flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 transition-colors hover:bg-slate-200">
          ÷
        </div>
        <div className="flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 transition-colors hover:bg-slate-200">
          ×
        </div>
        <div className="flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 transition-colors hover:bg-slate-200">
          +
        </div>
        <div className="flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 transition-colors hover:bg-slate-200">
          -
        </div>
        <div className="flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 transition-colors hover:bg-slate-200">
          7
        </div>
        <div className="flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 transition-colors hover:bg-slate-200">
          8
        </div>
        <div className="flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 transition-colors hover:bg-slate-200">
          9
        </div>
        <div className="flex cursor-pointer items-center justify-center rounded bg-orange-300 px-4 py-4 transition-colors hover:bg-orange-200">
          Del
        </div>
        <div className="flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 transition-colors hover:bg-slate-200">
          4
        </div>
        <div className="flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 transition-colors hover:bg-slate-200">
          5
        </div>
        <div className="flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 transition-colors hover:bg-slate-200">
          6
        </div>
        <div className="flex cursor-pointer items-center justify-center rounded bg-red-400 px-4 py-4 transition-colors hover:bg-red-300">
          AC
        </div>
        <div className="flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 transition-colors hover:bg-slate-200">
          1
        </div>
        <div className="flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 transition-colors hover:bg-slate-200">
          2
        </div>
        <div className="flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 transition-colors hover:bg-slate-200">
          3
        </div>
        <div className="row-span-2 flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 hover:bg-slate-200">
          =
        </div>
        <div className="col-span-2 flex cursor-pointer items-end justify-start rounded bg-slate-300 px-4 py-4 hover:bg-slate-200">
          0
        </div>
        <div className="flex cursor-pointer items-center justify-center rounded bg-slate-300 px-4 py-4 hover:bg-slate-200">
          .
        </div>
      </div>
    </div>
  );
}

export default App;
