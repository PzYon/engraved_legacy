import { IUser } from "engraved-shared";
import * as React from "react";
import { createContext, ReactNode, useState } from "react";
import { ThemeProvider } from "styled-components";
import { AuthenticatedServerApi } from "../authentication/AuthenticatedServerApi";
import { useDidMount } from "../common/Hooks";
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

  useDidMount(() => {
    const sub = AuthenticatedServerApi.currentUser$.subscribe((user: IUser) => {
      if (user?.settings?.themeStyle) {
        setThemeStyle(user.settings.themeStyle);
      }
    });

    return () => sub.unsubscribe();
  });

  return (
    <ThemeContext.Provider value={{ themeStyle, setThemeStyle }}>
      <ThemeProvider theme={theme}>
        <React.Fragment key={theme.themeStyle}>{props.children}</React.Fragment>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
