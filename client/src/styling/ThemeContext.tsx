import * as React from "react";
import { createContext, ReactNode, useState } from "react";
import { ThemeProvider } from "styled-components";
import { createTheme } from "./Theme";
import { ThemeStyle } from "./ThemeStyle";

export interface IThemeContext {
  themeStyle: ThemeStyle;
  setThemeStyle: (theme: ThemeStyle) => void;
}

export const ThemeContext = createContext<IThemeContext>({
  themeStyle: null,
  setThemeStyle: null
});

export const ThemeContextProvider = (props: { children: ReactNode }) => {
  const [themeStyle, setThemeStyle] = useState(ThemeStyle.Random);
  const theme = createTheme(themeStyle);

  return (
    <ThemeContext.Provider value={{ themeStyle, setThemeStyle }}>
      <ThemeProvider theme={theme}>
        <React.Fragment key={theme.themeStyle}>{props.children}</React.Fragment>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
