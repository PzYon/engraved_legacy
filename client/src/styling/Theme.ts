import rgba from "polished/lib/color/rgba";
import { ITheme } from "./ITheme";
import { ThemeStyle } from "./ThemeStyle";

const accentColor = "#0099CC";
const discreetColor = "#CCC";
const ultraDiscreetColor = "#F7F7F7";
const ultraUltraDiscreetColor = "#FAFAFA";
const darkColor = "#20232A";
const whiteColor = "#FFFFFF";

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

  return {
    themeStyle: isNonDark ? ThemeStyle.Light : ThemeStyle.Dark,
    headerHeightInPx: 50,
    transitionTime: "0.5s",
    borderRadius: "3px",
    maxContentWidth: "1000px",
    defaultSpacing: "15px",
    formElementPadding: "5px",
    bigBoxShadow: `0px 1px 20px 15px ${rgba(darkColor, 0.2)}`,
    defaultBoxShadow: `0 1px 6px 0 ${rgba(darkColor, 0.2)}`,
    discreetBoxShadow: `inset 0 -1px 0 ${rgba(darkColor, 0.2)}`,
    font: {
      family: "'IBM Plex Sans', sans-serif",
      codeFamily: "'Dank Mono', 'IBM Plex Mono', monospace",
      size: {
        small: "14px",
        regular: "18px",
        large: "25px",
        largest: "34px"
      },
      weight: {
        normal: 400,
        bold: 500
      }
    },
    colors: {
      text: isNonDark ? darkColor : ultraUltraDiscreetColor,
      accent: accentColor,
      accentContrast: whiteColor,
      discreet: discreetColor,
      ultraDiscreet: isNonDark ? ultraDiscreetColor : "#333",
      pageBackground: isNonDark ? whiteColor : "#444",
      rootPageBackground: isNonDark ? ultraUltraDiscreetColor : "#333",
      formElementBackground: isNonDark ? whiteColor : "#666",
      header: {
        background: darkColor,
        text: whiteColor
      },
      error: {
        background: "#D73A4A",
        text: whiteColor
      },
      warning: {
        background: "#ffbb00",
        text: darkColor
      },
      success: {
        background: "#006600",
        text: whiteColor
      }
    }
  };
};
