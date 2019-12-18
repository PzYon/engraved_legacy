import { IUser } from "engraved-shared";
import * as React from "react";
import { createContext, ReactNode, useState } from "react";
import { ThemeProvider } from "styled-components";
import { AuthenticatedServerApi } from "../authentication/AuthenticatedServerApi";
import { useDidMount } from "../common/Hooks";
import { LocalStorageUtil } from "../common/storage/LocalStorageUtil";
import { createTheme } from "./Theme";
import { ThemeStyle } from "./ThemeStyle";

const defaultThemeStyle = ThemeStyle.Light;

export interface IThemeContext {
  themeStyle: ThemeStyle;
  setThemeStyle: (theme: ThemeStyle) => void;
}

export const ThemeContext = createContext<IThemeContext>({
  themeStyle: null,
  setThemeStyle: null
});

export const ThemeContextProvider = (props: { children: ReactNode }) => {
  const [themeStyle, setThemeStyle] = useState(defaultThemeStyle);
  const theme = createTheme(themeStyle);

  useDidMount(() => {
    const sub = AuthenticatedServerApi.currentUser$.subscribe((user: IUser) => {
      let style: ThemeStyle;
      if (user?.settings?.themeStyle) {
        style = user.settings.themeStyle;
        LocalStorageUtil.setValue(style, "themeStyle");
      } else {
        style = LocalStorageUtil.getValue("themeStyle") || defaultThemeStyle;
      }

      setThemeStyle(style);
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
