import * as React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import styled from "styled-components";
import {Authenticated} from "../authentication/Authenticated";
import {StyleConstants} from "../styling/StyleConstants";
import {StyleUtil} from "../styling/StyleUtil";

const RootDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${StyleConstants.colors.accent};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`;

const TitleDiv = styled.div`
  font-size: 60px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const MessageDiv = styled.div`
  font-size: 25px;
  
  ${StyleUtil.normalizeAnchors("white")}
  
  a {
    font-weight: bold;
  }
`;

export const WelcomeScreen: React.SFC<{}> = () => {
    return (
        <RootDiv>
            <div>
                <TitleDiv>
                    engraved.
                </TitleDiv>
                <MessageDiv>
                    <a href="http://localhost:3001/api/authentication/google/start">Login</a> or <a href="http://localhost:3001/api/authentication/google/start">signup</a> using your google account.
                </MessageDiv>
            </div>
            <Router>
                <Route
                    path="/authenticated/:jwt"
                    component={Authenticated}
                    exact={true}
                />
            </Router>
        </RootDiv>
    );
};