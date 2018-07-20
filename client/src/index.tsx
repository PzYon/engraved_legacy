import * as React from "react";
import * as ReactDOM from "react-dom";
import { injectGlobal } from "styled-components";
import { App } from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { StyleConstants } from "./styling/StyleConstants";

const injectGlobalStyles = (): void => {
  return injectGlobal`
        body,
        html,
        input, 
        textarea,
        button,
        select {
            font-size: ${StyleConstants.font.regular};
            font-family: ${StyleConstants.font.family};
            color: ${StyleConstants.colors.font};
            background-color: white;
        }

        body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            overflow-y: scroll;
            background-color: ${StyleConstants.colors.pageBackground};
        }
`;
};

injectGlobalStyles();

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);

// registerServiceWorker();
