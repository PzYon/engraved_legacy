import { ReactNode } from "react";
import * as React from "react";
import styled from "styled-components";
import { StyleConstants } from "../styling/StyleConstants";

const Filler = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const RootContainer = Filler.extend`
  z-index: 100;
  display: flex;
`;

const BackgroundContainer = Filler.extend`
  z-index: 101;
  background-color: ${StyleConstants.colors.accent};
  opacity: 0.6;
`;

const InnerContainer = styled.div`
  z-index: 102;
  max-width: ${StyleConstants.maxContentWidth};
  margin: auto auto;
  padding: 1rem;
  background-color: white;
  border-radius: ${StyleConstants.borderRadius};
`;

const TitleContainer = styled.div`
  font-size: ${StyleConstants.font.large};
  color: ${StyleConstants.colors.accent};
`;

const ChildrenContainer = styled.div`
  padding-top: 1rem;
`;

interface IDialogProps {
  title: string;
  children: ReactNode;
}

export const Dialog: React.SFC<IDialogProps> = (props: IDialogProps) => {
  return (
    <RootContainer>
      <BackgroundContainer />
      <InnerContainer>
        <TitleContainer>{props.title}</TitleContainer>
        <ChildrenContainer>{props.children}</ChildrenContainer>
      </InnerContainer>
    </RootContainer>
  );
};