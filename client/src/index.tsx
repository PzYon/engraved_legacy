import * as React from "react";
import * as ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import { App } from "./App";
import { StyleUtil } from "./styling/StyleUtil";
import { ThemeContextProvider } from "./styling/ThemeContext";

const GlobalStyle = createGlobalStyle`
        ::selection {
          color: ${(p: any) => p.theme.colors.accentContrast};
          background: ${(p: any) => p.theme.colors.accent};
        }

        ${(p: any) => StyleUtil.normalizeAnchors(p.theme.colors.accent, p.theme.colors.text)}

        body,
        html,
        input, 
        textarea,
        button,
        select {
            font-family: ${(p: any) => p.theme.font.family};
            font-size: ${(p: any) => p.theme.font.size.regular};
            font-weight:  ${(p: any) => p.theme.font.weight.normal};
            color: ${(p: any) => p.theme.colors.text};
            background-color: ${(p: any) => p.theme.colors.formElementBackground};
        }

        body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            overflow-y: scroll;
            transition: background-color ease-in ${(p: any) => p.theme.transitionTime};
        }
`;

ReactDOM.render(
  <ThemeContextProvider>
    <GlobalStyle />
    <App />
  </ThemeContextProvider>,
  document.getElementById("root") as HTMLElement
);

// registerServiceWorker();
