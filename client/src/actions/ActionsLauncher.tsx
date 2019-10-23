import * as React from "react";
import { useContext } from "react";
import { fromEvent } from "rxjs";
import { useDidMount, useFlag } from "../common/Hooks";
import { ActionsContext } from "./ActionsContext";
import { ActionsPanel } from "./ActionsPanel";

export const ActionsLauncher = () => {
  const actionsContext = useContext(ActionsContext);
  const [isDropDownOpen, toggleIsDropDownOpen] = useFlag(false);

  useDidMount(() => {
    const sub = fromEvent(window, "keyup").subscribe((keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.ctrlKey && keyboardEvent.key === " ") {
        toggleIsDropDownOpen();
      }
    });

    return () => sub.unsubscribe();
  });

  if (!isDropDownOpen || !actionsContext.actions || actionsContext.actions.length === 0) {
    return null;
  }

  return <ActionsPanel closePanel={() => toggleIsDropDownOpen(false)} />;
};
