import * as React from "react";
import { createContext, ReactNode, useState } from "react";
import { IAction } from "../../common/IAction";

export const ContextualActionsContext = createContext<IContextualActionsContext>(null);

export interface IContextualActionsContext {
  actions: IAction[];
  addAction: (action: IAction) => () => void;
}

export class ContextualActionsContextType implements IContextualActionsContext {
  public constructor(
    public actions: IAction[] = [],
    private setActions: (actions: IAction[]) => void
  ) {}

  public addAction = (action: IAction): (() => void) => {
    if (this.containsAction(action)) {
      return void 0;
    }

    console.log("adding action", action);

    this.actions = [...this.actions, action];
    this.setActions(this.actions);

    return () => this.removeAction(action);
  };

  private removeAction = (action: IAction): void => {
    console.log("removing action", action);

    this.actions = this.actions.filter(a => a !== action);
    this.setActions(this.actions);
  };

  private containsAction = (action: IAction): boolean => {
    return this.actions.filter(a => a.label === action.label).length > 0;
  };
}

export const ContextualActionsProvider = (props: { children: ReactNode }) => {
  const [actions, setActions] = useState<IAction[]>([]);

  return (
    <ContextualActionsContext.Provider
      value={new ContextualActionsContextType(actions, setActions)}
    >
      {props.children}
    </ContextualActionsContext.Provider>
  );
};
