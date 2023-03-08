import { SunIcon } from "@heroicons/react/24/solid";
import { MoonIcon } from "@heroicons/react/24/solid";
import { ComputerDesktopIcon } from "@heroicons/react/24/solid";
import { useTheme } from "../contexts/ThemeContext";

export function ThemeSwitcher({ expandTheme, setExpandTheme }) {
  const { theme, setTheme, getTheme } = useTheme();

  return (
    <div
      className="relative flex h-7 w-20 cursor-pointer items-center rounded bg-black py-2 px-1"
      onClick={(e) => {
        // Prevent bubbling so it does not fire the function on App.jsx
        e.stopPropagation();
        setExpandTheme((prev) => !prev);
      }}
    >
      <div className="flex items-center justify-center gap-1 px-1">
        <ComputerDesktopIcon className="h-4 w-4 text-white" />
        <p className="font-bold text-white">Theme</p>
      </div>
      <div
        className={`${
          expandTheme ? "block" : "hidden"
        } absolute top-8 left-[-50%] flex flex-col items-center justify-center gap-1 rounded bg-black p-3 shadow-lg shadow-slate-700`}
      >
        <div
          className={`flex h-9 w-40 items-center gap-3 rounded ${
            !theme ? "bg-gray-700" : ""
          } p-2 shadow-sm hover:bg-gray-400`}
        >
          <ComputerDesktopIcon className="h-5 w-5 text-white" />
          <p className="text-sm font-bold text-white">Default</p>
        </div>
        <div
          className={`flex h-9 w-40 items-center gap-3 rounded ${
            theme === "light" ? "bg-gray-700" : ""
          } p-2 shadow-sm hover:bg-gray-400`}
        >
          <SunIcon className="h-5 w-5 text-white" />
          <p className="text-sm font-bold text-white">Light</p>
        </div>
        <div
          className={`flex h-9 w-40 items-center gap-3 rounded ${
            theme === "dark" ? "bg-gray-700" : ""
          } p-2 shadow-sm hover:bg-gray-400`}
        >
          <MoonIcon className="h-5 w-5 text-white" />
          <p className="text-sm font-bold text-white">Dark</p>
        </div>
      </div>
    </div>
  );
}
