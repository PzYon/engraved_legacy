import * as React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { useFlag } from "../common/Hooks";
import { If } from "../common/If";
import { ActionsContext } from "./ActionsContext";
import { ActionsPanel } from "./ActionsPanel";

export const ActionsLauncher = () => {
  const [isOpen, setIsOpen] = useFlag(false);
  const actionsContext = useContext(ActionsContext);

  return (
    <>
      <If
        value={actionsContext.actions}
        render={() => <Container onClick={setIsOpen as any}>@</Container>}
      />
      <If
        value={isOpen && actionsContext.actions}
        render={() => <ActionsPanel closePanel={() => setIsOpen(false)} />}
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
  color: ${p => p.theme.colors.accent};
  font-weight: ${p => p.theme.font.weight.bold};
  cursor: pointer;
`;
