import { createContext, ReactNode, useContext, useState } from "react";
import * as React from "react";
import styled from "styled-components";
import { useFlag } from "../../common/Hooks";
import { If } from "../../common/If";

export interface IContextualAction {
  key: string;
  label: ReactNode;
  onClick: () => void;
}

export const ContextualActionsContext = createContext<ConActConObj>(null);

export class ConActConObj {
  public constructor(
    public actions: IContextualAction[] = [],
    private setActions: (actions: IContextualAction[]) => void
  ) {}

  public addAction = (action: IContextualAction): void => {
    if (!this.containsAction(action)) {
      this.actions = [...this.actions, action];
      this.setActions(this.actions);
    }
  };

  public removeAction = (actionKey: string): void => {
    this.actions = this.actions.filter(a => a.key !== actionKey);
    this.setActions(this.actions);
  };

  private containsAction = (action: IContextualAction): boolean => {
    return this.actions.filter(a => a.key === action.key).length > 0;
  };
}

export const ContextualActionsProvider = (props: { children: ReactNode }) => {
  const [actions, setActions] = useState<IContextualAction[]>([]);

  return (
    <ContextualActionsContext.Provider value={new ConActConObj(actions, setActions)}>
      {props.children}
    </ContextualActionsContext.Provider>
  );
};

export const ContextualActionsLauncher = () => {
  const [isOpen, setIsOpen] = useFlag(false);

  return (
    <>
      <Container onClick={setIsOpen as any}>@</Container>
      <If
        value={isOpen}
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

export const ContextualActionsPanel = (props: { closePanel: () => void }) => {
  const contextualActionsContext = useContext(ContextualActionsContext);

  return (
    <Panel>
      <ul>
        {contextualActionsContext.actions.map((a, i) => (
          <li
            key={a.key || i}
            onClick={() => {
              a.onClick();
              props.closePanel();
            }}
          >
            {a.label}
          </li>
        ))}
      </ul>
    </Panel>
  );
};

const Panel = styled.div`
  width: 300px;
  background-color: deeppink;
`;
