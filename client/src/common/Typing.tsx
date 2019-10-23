import * as React from "react";
import { useState } from "react";
import { useDidMount, useFlag, useTheme } from "./Hooks";
import { Typer } from "./Typer";

export const Typing = (props: { textToType: string }) => {
  const [currentValue, setCurrentValue] = useState("");
  const [isCursorVisible, toggleIsCursorVisible] = useFlag(true);
  const theme = useTheme();

  useDidMount(() => {
    const typer = new Typer(props.textToType, setCurrentValue, toggleIsCursorVisible);
    typer.start();

    return typer.end;
  });

  return (
    <span style={isCursorVisible ? { borderRight: `2px solid ${theme.colors.header.text}` } : null}>
      {currentValue}
    </span>
  );
};
