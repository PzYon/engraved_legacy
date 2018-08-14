import * as React from "react";
import * as ReactDOM from "react-dom";
import { injectGlobal } from "styled-components";
import { App } from "./App";
import { StyleConstants } from "./styling/StyleConstants";
import { StyleUtil } from "./styling/StyleUtil";

const injectGlobalStyles = (): void => {
  return injectGlobal`
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
            font-weight: 400;
            color: ${StyleConstants.colors.font};
            background-color: white;
        }

        body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            overflow-y: scroll;
            background-color: white;
        }
`;
};

injectGlobalStyles();

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);

// registerServiceWorker();
