import rgba from "polished/lib/color/rgba";

const accentColor = "#0099CC";
const discreetColor = "#CCC";
const ultraDiscreetColor = "#F7F7F7";
const ultraUltraDiscreetColor = "#FAFAFA";
const darkColor = "#20232A";
const whiteColor = "#FFFFFF";

export const StyleConstants = {
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
    small: "14px",
    regular: "18px",
    large: "25px",
    largest: "34px",
    family: "'IBM Plex Sans', sans-serif",
    codeFamily: "monospace",
    weight: {
      normal: 400,
      bold: 500
    }
  },
  colors: {
    font: darkColor,
    accent: accentColor,
    discreet: discreetColor,
    ultraDiscreet: ultraDiscreetColor,
    pageBackground: whiteColor,
    rootPageBackground: ultraUltraDiscreetColor,
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
