const accentColor = "#0099CC";
const discreetColor = "#DDD";
const ultraDiscreetColor = "#F7F7F7";
const darkColor = "#24292E";
const whiteColor = "#FFFFFF";

export const StyleConstants = {
  headerHeightInPx: 50,
  borderRadius: "3px",
  maxContentWidth: "1000px",
  defaultSpacing: "15px",
  formElementPadding: "5px",
  defaultBoxShadow: `1px 1px 10px ${discreetColor}`,
  font: {
    small: "0.8rem",
    regular: "18px",
    large: "1.2rem",
    family: "'IBM Plex Sans', sans-serif",
    codeFamily: "monospace"
  },
  colors: {
    font: darkColor,
    accent: accentColor,
    discreet: discreetColor,
    ultraDiscreet: ultraDiscreetColor,
    pageBackground: whiteColor,
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
