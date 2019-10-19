import * as React from "react";
import { createContext, ReactNode, useReducer, useState } from "react";
import { IAction } from "./IAction";

export const ActionsContext = createContext<IActionsContext>(null);

export interface IActionsContext {
  actions: IAction[];
  dispatch: (args: { action: IAction; key: string }) => void;
}

const reducer = (
  actions: IAction[],
  args: {
    action: IAction;
    key: string;
  }
): IAction[] => {
  switch (args.key) {
    case "add": {
      return [...actions, args.action];
    }
    case "remove": {
      return [...actions.filter(a => a.label !== args.action.label)];
    }
    default: {
      throw new Error("what ever");
    }
  }
};

export const ContextualActionsProvider = (props: { children: ReactNode }) => {
  const [actions, dispatch] = useReducer(reducer, []);

  return (
    <ActionsContext.Provider
      value={{
        actions: actions,
        dispatch: dispatch
      }}
    >
      {props.children}
    </ActionsContext.Provider>
  );
};
