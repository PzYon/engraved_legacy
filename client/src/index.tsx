import * as React from "react";
import * as ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import { App } from "./App";
import { StyleConstants } from "./styling/StyleConstants";
import { StyleUtil } from "./styling/StyleUtil";

const createGlobalStyles = (): any => {
  return createGlobalStyle`
        ::selection {
          color: white;
          background: ${StyleConstants.colors.accent};
        }
        
        
        ${StyleUtil.normalizeAnchors(StyleConstants.colors.accent, StyleConstants.colors.font)}

        body,
        html,
        input, 
        textarea,
        button,
        select {
            font-family: ${StyleConstants.font.family};
            font-size: ${StyleConstants.font.regular};
            font-weight:  ${StyleConstants.font.weight.normal};
            color: ${StyleConstants.colors.font};
            background-color: white;
        }

        body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            overflow-y: scroll;
            transition: background-color ease-in ${StyleConstants.transitionTime};
        }
`;
};

const GlobalStyle = createGlobalStyles();

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById("root") as HTMLElement
);

// registerServiceWorker();
