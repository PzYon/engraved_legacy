import * as React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { useFlag } from "../../common/Hooks";
import { If } from "../../common/If";
import { ContextualActionsContext } from "./ContextualActionsContext";
import { ContextualActionsPanel } from "./ContextualActionsPanel";

export const ContextualActionsLauncher = () => {
  const [isOpen, setIsOpen] = useFlag(false);
  const contextualActionsContext = useContext(ContextualActionsContext);

  return (
    <>
      <If
        value={contextualActionsContext.actions}
        render={() => <Container onClick={setIsOpen as any}>@</Container>}
      />
      <If
        value={isOpen && contextualActionsContext.actions}
        render={() => <ContextualActionsPanel closePanel={() => setIsOpen(false)} />}
      />
    </>
  );
};

const Container = styled.div`
  border-radius: 50%;
  font-size: 30px;
  height: 43px;
  width: 43px;
  text-align: center;
  background-color: ${p => p.theme.colors.accent};
  color: ${p => p.theme.colors.accentContrast};
  font-weight: ${p => p.theme.font.weight.bold};
  cursor: pointer;
`;
