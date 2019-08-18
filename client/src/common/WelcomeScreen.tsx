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
  font-weight: 500;
  margin-bottom: 20px;
`;

const MessageDiv = styled.div`
  font-size: ${StyleConstants.font.large};

  ${StyleUtil.normalizeAnchors("white")} a {
    font-weight: 500;
  }
`;

export const WelcomeScreen: React.FC<{}> = () => {
  return (
    <RootDiv>
      <InnerDiv>
        <TitleDiv>engraved.</TitleDiv>
        <MessageDiv>
          <a href={AuthenticatedServerApi.authUrl}>Login</a> or{" "}
          <a href={AuthenticatedServerApi.authUrl}>sign up</a> using your google account.
        </MessageDiv>
      </InnerDiv>
    </RootDiv>
  );
};
