import * as React from "react";
import styled from "styled-components";
import { AuthenticatedServerApi } from "../authentication/AuthenticatedServerApi";
import { StyleConstants } from "../styling/StyleConstants";
import { StyleUtil } from "../styling/StyleUtil";

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

const InnerDiv = styled.div`
  margin: 1rem;
`;

const TitleDiv = styled.div`
  font-size: 60px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const MessageDiv = styled.div`
  font-size: 25px;

  ${StyleUtil.normalizeAnchors("white")} a {
    font-weight: bold;
  }
`;

export const WelcomeScreen: React.SFC<{}> = () => {
  return (
    <RootDiv>
      <InnerDiv>
        <TitleDiv>engraved.</TitleDiv>
        <MessageDiv>
          <a href={AuthenticatedServerApi.authUrl}>Login</a> or{" "}
          <a href={AuthenticatedServerApi.authUrl}>signup</a> using your google account.
        </MessageDiv>
      </InnerDiv>
    </RootDiv>
  );
};
