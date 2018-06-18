import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {injectGlobal} from "styled-components";
import {App} from "./App";
import {StyleConstants} from "./common/styling/StyleConstants";
import registerServiceWorker from './registerServiceWorker';

const injectGlobalStyles = (): void => {
    return injectGlobal`
        body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            overflow-y: scroll;
        }
        
        body,
        html,
        input, 
        textarea,
        button,
        select {
            font-size: 20px;
            font-family: ${StyleConstants.fontFamily};
            color: ${StyleConstants.colors.font};
            background-color: ${StyleConstants.colors.pageBackGround};
        }
        
        #root {
            max-width: 1200px;
            margin: auto;
        }
`;
};

injectGlobalStyles();

ReactDOM.render(
    <App/>,
    document.getElementById('root') as HTMLElement
);

registerServiceWorker();
