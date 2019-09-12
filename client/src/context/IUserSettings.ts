import { ThemeStyle } from "../styling/ThemeStyle";

export interface IUserSettings {
  themeStyle: ThemeStyle;
  setThemeStyle: (theme: ThemeStyle) => void;
}
