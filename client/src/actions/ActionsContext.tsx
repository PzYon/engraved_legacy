import * as React from "react";
import { createContext, ReactNode, useReducer } from "react";
import { IAction } from "./IAction";

export interface IActionsContextPayload {
  action: IAction;
  type: ActionsType;
}

export interface IActionsContext {
  actions: IAction[];
  dispatch: (payload: IActionsContextPayload) => void;
}

export const ActionsContext = createContext<IActionsContext>(null);

export enum ActionsType {
  Add,
  Remove
}

const actionsReducer = (actions: IAction[], payload: IActionsContextPayload): IAction[] => {
  switch (payload.type) {
    case ActionsType.Add:
      return [...actions, payload.action];

    case ActionsType.Remove:
      return [...actions.filter(a => a.label !== payload.action.label)];

    default:
      throw new Error("what ever");
  }
};

export const ContextualActionsProvider = (props: { children: ReactNode }) => {
  const [actions, dispatch] = useReducer(actionsReducer, []);

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
