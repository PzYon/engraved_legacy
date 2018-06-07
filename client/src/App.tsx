import * as React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import styled from "styled-components";
import {Home} from "./Home";

const AppRootDiv = styled.div`
  background-color: lightskyblue;
  min-height: 100vh;
  height: 100%;
  width: 100%;
`;

export const App: React.SFC = () =>
    (
        <Router>
            <AppRootDiv>
                <Home/>
            </AppRootDiv>
        </Router>
    );
