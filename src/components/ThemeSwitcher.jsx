import { SunIcon } from "@heroicons/react/24/solid";
import { MoonIcon } from "@heroicons/react/24/solid";
import { ComputerDesktopIcon } from "@heroicons/react/24/solid";
import { useTheme } from "../contexts/ThemeContext";
import { useState } from "react";

export function ThemeSwitcher({ expandTheme, setExpandTheme }) {
  const { theme, setTheme, getTheme } = useTheme();
  const [storageTheme, setStorageTheme] = useState(
    localStorage.getItem("theme") ? true : false
  );

  return (
    <div
      className="relative flex h-7 w-20 cursor-pointer items-center rounded bg-black py-2 px-1"
      onClick={(e) => {
        // Prevent bubbling so it does not fire the function on App.jsx
        e.stopPropagation();
        setExpandTheme((prev) => !prev);
      }}
    >
      <button className="flex items-center justify-center gap-1 px-1">
        <ComputerDesktopIcon className="h-4 w-4 text-white" />
        <p className="font-bold text-white">Theme</p>
      </button>
      <div
        className={`${
          expandTheme ? "block" : "hidden"
        } absolute top-8 left-[-50%] flex flex-col items-center justify-center gap-1 rounded bg-black p-3 shadow-lg shadow-slate-700`}
      >
        <button
          className={`flex h-9 w-40 items-center gap-3 rounded ${
            !storageTheme ? "bg-gray-700" : ""
          } p-2 shadow-sm hover:bg-gray-400`}
          onClick={() => {
            localStorage.removeItem("theme");
            setTheme(getTheme());
            setStorageTheme(false);
          }}
        >
          <ComputerDesktopIcon className="h-5 w-5 text-white" />
          <p className="text-sm font-bold text-white">Default</p>
        </button>
        <button
          className={`flex h-9 w-40 items-center gap-3 rounded ${
            theme === "light" && storageTheme ? "bg-gray-700" : ""
          } p-2 shadow-sm hover:bg-gray-400`}
          onClick={() => {
            localStorage.setItem("theme", "light");
            setTheme(getTheme());
            setStorageTheme(true);
          }}
        >
          <SunIcon className="h-5 w-5 text-white" />
          <p className="text-sm font-bold text-white">Light</p>
        </button>
        <button
          className={`flex h-9 w-40 items-center gap-3 rounded ${
            theme === "dark" && storageTheme ? "bg-gray-700" : ""
          } p-2 shadow-sm hover:bg-gray-400`}
          onClick={() => {
            localStorage.setItem("theme", "dark");
            setTheme(getTheme());
            setStorageTheme(true);
          }}
        >
          <MoonIcon className="h-5 w-5 text-white" />
          <p className="text-sm font-bold text-white">Dark</p>
        </button>
      </div>
    </div>
  );
}
