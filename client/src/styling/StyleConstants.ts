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
  defaultBoxShadow: `1px 1px 10px ${discreetColor}`,
  font: {
    small: "0.8rem",
    regular: "18px",
    large: "1.3rem",
    largest: "1.5rem",
    family: "'IBM Plex Sans', sans-serif",
    codeFamily: "monospace"
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
