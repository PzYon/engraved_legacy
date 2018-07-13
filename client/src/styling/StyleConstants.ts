const accentColor = "#0099CC";
const discreetColor = "#DCDCDC";
const darkColor = "#24292E";

export const StyleConstants = {
    headerHeightInPx: 50,
    maxContentWidth: "1200px",
    defaultSpacing: "15px",
    largeFontSize: "1.2rem",
    formElementPadding: "4px",
    fontFamily: "'IBM Plex Sans', sans-serif",
    defaultBoxShadow: `3px 3px 10px ${discreetColor}`,
    colors: {
        font: darkColor,
        accent: accentColor,
        discreet: discreetColor,
        pageBackground: "white",
        header: {
            background: darkColor,
            text: "white"
        },
        error: {
            background: "#D73A4A",
            text: "white"
        },
        warning: {
            background: "#ffbb00",
            text: "black"
        },
        success: {
            background: "#006600",
            text: "white"
        }
    }
};