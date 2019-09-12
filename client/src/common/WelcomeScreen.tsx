import * as React from "react";
import styled from "styled-components";
import { AuthenticatedServerApi } from "../authentication/AuthenticatedServerApi";
import { StyleUtil } from "../styling/StyleUtil";

const RootDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${p => p.theme.colors.accent};
  color: ${p => p.theme.colors.accentContrast};
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
  font-weight: ${p => p.theme.font.weight.bold};
  margin-bottom: 20px;
`;

const MessageDiv = styled.div`
  font-size: ${p => p.theme.font.size.large};

  ${p => StyleUtil.normalizeAnchors(p.theme.colors.accentContrast)} a {
    font-weight: ${p => p.theme.font.weight.bold};
  }
`;

export const WelcomeScreen: React.FC<{}> = () => (
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
