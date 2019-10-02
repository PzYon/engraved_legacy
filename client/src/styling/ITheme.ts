import { IColorPalette } from "./IColorPalette";
import { ThemeStyle } from "./ThemeStyle";

export interface ITheme {
  themeStyle: ThemeStyle;
  headerHeightInPx: number;
  transitionTime: string;
  borderRadius: string;
  maxContentWidth: string;
  defaultSpacing: string;
  bigSpacing: string;
  formElementPadding: string;
  bigBoxShadow: string;
  defaultBoxShadow: string;
  discreetBoxShadow: string;
  font: {
    family: string;
    codeFamily: string;
    size: {
      small: string;
      regular: string;
      large: string;
      largest: string;
    };
    weight: {
      normal: number;
      bold: number;
    };
  };
  colors: {
    palette: IColorPalette;
    text: string;
    accent: string;
    accentContrast: string;
    pageBackground: string;
    rootPageBackground: string;
    formElementBackground: string;
    border: string;
    header: {
      background: string;
      text: string;
    };
    error: {
      background: string;
      text: string;
    };
    warning: {
      background: string;
      text: string;
    };
    success: {
      background: string;
      text: string;
    };
  };
}
