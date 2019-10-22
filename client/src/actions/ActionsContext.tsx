import * as React from "react";
import { createContext, ReactNode, Reducer, useReducer } from "react";
import { IAction } from "./IAction";

const actionsReducer: Reducer<IAction[], IActionsContextPayload> = (
  state: IAction[],
  payload: IActionsContextPayload
): IAction[] => {
  switch (payload.type) {
    case ActionsContextMethod.Add:
      return [...state, payload.action];

    case ActionsContextMethod.Remove:
      return [...state.filter(a => a.label !== payload.action.label)];

    default:
      throw new Error(`Unsupported ActionsContextMethod '${payload.type}'.`);
  }
};

export enum ActionsContextMethod {
  Add,
  Remove
}

export interface IActionsContextPayload {
  action: IAction;
  type: ActionsContextMethod;
}

export interface IActionsContext {
  actions: IAction[];
  dispatch: (payload: IActionsContextPayload) => void;
}

export const ActionsContext = createContext<IActionsContext>(null);

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
