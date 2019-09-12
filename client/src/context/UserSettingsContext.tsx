import * as React from "react";
import { createContext, ReactNode, useState } from "react";
import { ThemeProvider } from "styled-components";
import { createTheme } from "../styling/Theme";
import { ThemeStyle } from "../styling/ThemeStyle";
import { IUserSettings } from "./IUserSettings";

export const UserSettingsContext = createContext<IUserSettings>({
  themeStyle: null,
  setThemeStyle: null
});

export const UserSettingsContextProvider = (props: { children: ReactNode }) => {
  const [themeStyle, setThemeStyle] = useState(ThemeStyle.Random);
  const theme = createTheme(themeStyle);

  return (
    <UserSettingsContext.Provider value={{ themeStyle, setThemeStyle }}>
      <ThemeProvider theme={theme}>
        <React.Fragment key={theme.themeStyle}>{props.children}</React.Fragment>
      </ThemeProvider>
    </UserSettingsContext.Provider>
  );
};
