import rgba from "polished/lib/color/rgba";
import { IColorPalette } from "./IColorPalette";
import { ITheme } from "./ITheme";
import { ThemeStyle } from "./ThemeStyle";

const ACCENT = "#0099CC";
const ACCENT_CONTRAST = "#FFF";
const HEADER = "#252525";
const HEADER_TEXT = "#FCFCFC";

const LIGHT_COLOR_PALETTE: IColorPalette = {
  primary: HEADER,
  accent: ACCENT,
  shades: {
    zero: "#FFF",
    lightest: HEADER_TEXT,
    light: "#F8F8F8",
    regular: "#E0E0E0",
    dark: "#D8D8D8"
  }
};

const DARK_COLOR_PALETTE: IColorPalette = {
  primary: HEADER_TEXT,
  accent: ACCENT,
  shades: {
    zero: "#333",
    lightest: "#555",
    light: "#444",
    regular: "#3B3B3B",
    dark: "#363636"
  }
};

const getIsNonDark = (themeStyle: ThemeStyle): boolean => {
  switch (themeStyle) {
    case ThemeStyle.Dark:
      return false;
    case ThemeStyle.Light:
      return true;
    case ThemeStyle.Random:
      return Math.random() > 0.5;
  }
};

export const createTheme = (themeStyle: ThemeStyle): ITheme => {
  const isNonDark = getIsNonDark(themeStyle);
  const palette = isNonDark ? LIGHT_COLOR_PALETTE : DARK_COLOR_PALETTE;

  return {
    themeStyle: isNonDark ? ThemeStyle.Light : ThemeStyle.Dark,
    headerHeightInPx: 50,
    transitionTime: "0.5s",
    borderRadius: "3px",
    maxContentWidth: "1000px",
    defaultSpacing: "15px",
    bigSpacing: "30px",
    formElementPadding: "5px",
    bigBoxShadow: `0px 1px 20px 15px ${rgba(palette.primary, 0.2)}`,
    defaultBoxShadow: isNonDark
      ? `0 1px 6px 0 ${rgba(palette.primary, 0.2)}`
      : "none",
    discreetBoxShadow: `inset 0 -1px 0 ${rgba(palette.primary, 0.2)}`,
    font: {
      family: "'Fira Sans', sans-serif",
      codeFamily: "'Dank Mono', monospace",
      logoFamily: "'Pacifico', cursive",
      size: {
        small: "14px",
        regular: "18px",
        large: "25px"
      },
      weight: {
        normal: 300,
        bold: 500
      }
    },
    colors: {
      palette: palette,
      text: palette.primary,
      accent: palette.accent,
      accentContrast: ACCENT_CONTRAST,
      pageBackground: palette.shades.zero,
      rootPageBackground: palette.shades.light,
      formElementBackground: isNonDark
        ? palette.shades.lightest
        : palette.shades.regular,
      border: isNonDark ? palette.shades.dark : palette.primary,
      header: {
        background: HEADER,
        text: HEADER_TEXT
      },
      error: {
        background: "#D73A4A",
        text: HEADER_TEXT
      },
      warning: {
        background: "#ffbb00",
        text: HEADER
      },
      success: {
        background: "#006600",
        text: HEADER_TEXT
      }
    }
  };
};
