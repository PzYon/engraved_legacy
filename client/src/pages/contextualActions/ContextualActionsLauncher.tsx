import { createContext, ReactNode, useContext, useState } from "react";
import * as React from "react";
import styled from "styled-components";
import { useFlag } from "../../common/Hooks";
import { If } from "../../common/If";
import { DropDown } from "../../common/searchBox/dropDown/DropDown";
import { IDropDownItem } from "../../common/searchBox/dropDown/IDropDownItem";

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
      <DropDown
        groups={[
          {
            onSelectItem: (item: IDropDownItem<IContextualAction>) => {
              if (item && item.item.onClick) {
                item.item.onClick();
              }
            },
            items: contextualActionsContext.actions.map(a => ({
              key: a.key,
              label: a.label,
              item: a
            }))
          }
        ]}
        onClose={props.closePanel}
      />
    </Panel>
  );
};

const Panel = styled.div`
  width: 300px;
  position: absolute;
  right: 50px;
  top: 0;
`;
