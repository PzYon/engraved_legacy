import * as React from "react";
import { useContext, useRef } from "react";
import { fromEvent } from "rxjs";
import { useDidMount, useFlag } from "../common/Hooks";
import { ActionsContext } from "./ActionsContext";
import { ActionsPanel } from "./ActionsPanel";

export const ActionsLauncher = () => {
  const actionsContext = useContext(ActionsContext);
  const [isDropDownOpen, toggleIsDropDownOpen] = useFlag(false);
  const isOpen = useRef(isDropDownOpen);

  const toggleIsOpen = (forceValue?: boolean) => {
    isOpen.current = forceValue !== undefined ? forceValue : !isOpen.current;
    toggleIsDropDownOpen(isOpen.current);
  };

  useDidMount(() => {
    const sub = fromEvent(window, "keyup").subscribe((keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.ctrlKey && keyboardEvent.key === " ") {
        toggleIsOpen();
      }
    });

    return () => sub.unsubscribe();
  });

  if (!isDropDownOpen || !actionsContext.actions || actionsContext.actions.length === 0) {
    return null;
  }

  return <ActionsPanel closePanel={() => toggleIsOpen(false)} />;
};
