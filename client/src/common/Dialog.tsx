import * as React from "react";
import { ReactNode } from "react";
import styled from "styled-components";
import { FaderContainer } from "./FaderContainer";

const Filler = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const RootContainer = styled(Filler)`
  z-index: 100;
  display: flex;
`;

const BackgroundContainer = styled(Filler)`
  z-index: 101;
  background-color: ${p => p.theme.colors.accent};
  opacity: 0.6;
`;

const InnerContainer = styled.div`
  z-index: 102;
  max-width: ${p => p.theme.maxContentWidth};
  margin: auto auto;
  padding: 1rem;
  background-color: ${p => p.theme.colors.pageBackground};
  border-radius: ${p => p.theme.borderRadius};
  box-shadow: ${p => p.theme.bigBoxShadow};
`;

const TitleContainer = styled.div`
  font-size: ${p => p.theme.font.size.large};
  color: ${p => p.theme.colors.accent};
`;

const ChildrenContainer = styled.div`
  padding-top: 1rem;
`;

interface IDialogProps {
  title: string;
  children: ReactNode;
}

export const Dialog: React.FC<IDialogProps> = (props: IDialogProps) => {
  return (
    <FaderContainer style={{ position: "fixed", zIndex: 100 }}>
      <RootContainer>
        <BackgroundContainer />
        <InnerContainer>
          <TitleContainer>{props.title}</TitleContainer>
          <ChildrenContainer>{props.children}</ChildrenContainer>
        </InnerContainer>
      </RootContainer>
    </FaderContainer>
  );
};
