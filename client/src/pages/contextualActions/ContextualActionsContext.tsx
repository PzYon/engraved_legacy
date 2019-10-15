import * as React from "react";
import { createContext, ReactNode, useState } from "react";

export interface IContextualAction {
  key: string;
  label: ReactNode;
  onClick: () => void;
}

export const ContextualActionsContext = createContext<IContextualActionsContext>(null);

export interface IContextualActionsContext {
  actions: IContextualAction[];
  addAction: (action: IContextualAction) => void;
  removeAction: (actionKey: string) => void;
}

export class ContextualActionsContextType implements IContextualActionsContext {
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
    <ContextualActionsContext.Provider
      value={new ContextualActionsContextType(actions, setActions)}
    >
      {props.children}
    </ContextualActionsContext.Provider>
  );
};
