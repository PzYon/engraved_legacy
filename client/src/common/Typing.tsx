import * as React from "react";
import { useState } from "react";
import { useDidMount, useFlag, useTheme } from "./Hooks";
import { Typer } from "./Typer";

interface ITypingProps {
  textToType: string;
}

export const Typing: React.FC<ITypingProps> = (props: ITypingProps) => {
  const [currentValue, setCurrentValue] = useState("");
  const [isCursorVisible, toggleIsCursorVisible] = useFlag(true);
  const theme = useTheme();

  useDidMount(() => {
    let isVisible = isCursorVisible;

    const toggleCursor = (show?: boolean) => {
      isVisible = show === true || show === false ? show : !isVisible;
      toggleIsCursorVisible(isVisible);
    };

    const typer = new Typer(props.textToType, setCurrentValue, toggleCursor);
    typer.start();

    return typer.end;
  });

  return (
    <span style={isCursorVisible ? { borderRight: `2px solid ${theme.colors.header.text}` } : null}>
      {currentValue}
    </span>
  );
};
