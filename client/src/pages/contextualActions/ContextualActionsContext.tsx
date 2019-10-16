import * as React from "react";
import { createContext, ReactNode, useState } from "react";

export interface IContextualAction {
  label: string;
  onClick: () => void;
}

export const ContextualActionsContext = createContext<IContextualActionsContext>(null);

export interface IContextualActionsContext {
  actions: IContextualAction[];
  addAction: (action: IContextualAction) => () => void;
}

export class ContextualActionsContextType implements IContextualActionsContext {
  public constructor(
    public actions: IContextualAction[] = [],
    private setActions: (actions: IContextualAction[]) => void
  ) {}

  public addAction = (action: IContextualAction): (() => void) => {
    if (this.containsAction(action)) {
      return void 0;
    }

    console.log("adding action", action);

    this.actions = [...this.actions, action];
    this.setActions(this.actions);

    return () => this.removeAction(action);
  };

  private removeAction = (action: IContextualAction): void => {
    console.log("removing action", action);

    this.actions = this.actions.filter(a => a !== action);
    this.setActions(this.actions);
  };

  private containsAction = (action: IContextualAction): boolean => {
    return this.actions.filter(a => a.label === action.label).length > 0;
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
