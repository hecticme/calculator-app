import { useState, useContext, createContext } from "react";

const ThemeContext = createContext();
const isThemeDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

const getTheme = () => {
  const localStorageTheme = localStorage.getItem("theme");
  if (localStorageTheme) {
    return localStorageTheme;
  } else {
    if (isThemeDark) {
      return "dark";
    } else {
      return "light";
    }
  }
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getTheme());
  // Set default theme to the system theme.

  return (
    <ThemeContext.Provider value={{ theme, setTheme, getTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
