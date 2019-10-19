import * as React from "react";
import { createContext, ReactNode, useState } from "react";
import { IAction } from "./IAction";

export const ActionsContext = createContext<IActionsContext>(null);

export interface IActionsContext {
  actions: IAction[];
  addAction: (action: IAction) => () => void;
}

export class ActionsContextType implements IActionsContext {
  public actions: IAction[];

  public constructor(actions: IAction[] = [], private setActions: (actions: IAction[]) => void) {
    this.actions = [...actions];
  }

  public addAction = (action: IAction): (() => void) => {
    if (this.containsAction(action)) {
      return undefined;
    }

    console.log("adding action", action);

    this.actions = [...this.actions, action];
    this.setActions(this.actions);

    return () => this.removeAction(action);
  };

  private removeAction = (action: IAction): void => {
    console.log("actions length:" + this.actions.length);
    console.log("removing action", action);
    this.actions = this.actions.filter(a => a.label !== action.label);
    console.log("actions length:" + this.actions.length);

    this.setActions(this.actions);
  };

  private containsAction = (action: IAction): boolean => {
    return this.actions.filter(a => a.label === action.label).length > 0;
  };
}

export const ContextualActionsProvider = (props: { children: ReactNode }) => {
  const [actions, setActions] = useState<IAction[]>([]);

  return (
    <ActionsContext.Provider value={new ActionsContextType(actions, setActions)}>
      {props.children}
    </ActionsContext.Provider>
  );
};
