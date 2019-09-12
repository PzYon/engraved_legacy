import { ThemeStyle } from "./ThemeStyle";

export interface ITheme {
  themeStyle: ThemeStyle;
  headerHeightInPx: number;
  transitionTime: string;
  borderRadius: string;
  maxContentWidth: string;
  defaultSpacing: string;
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
    text: string;
    accent: string;
    accentContrast: string;
    discreet: string;
    ultraDiscreet: string;
    pageBackground: string;
    rootPageBackground: string;
    formElementBackground: string;
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
