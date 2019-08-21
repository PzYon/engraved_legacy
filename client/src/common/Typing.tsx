import * as React from "react";
import { useEffect, useState } from "react";
import { Typer } from "./Typer";

const blinkDurationMs = 600;

interface ITypingProps {
  textToType: string;
}

export const Typing: React.FC<ITypingProps> = (props: ITypingProps) => {
  const [currentValue, setCurrentValue] = useState("");
  const [isCursorVisible, setIsCursorVisible] = useState(true);

  useEffect(() => {
    let isVisible = isCursorVisible;
    const cursorInterval = setInterval(() => {
      isVisible = !isVisible;
      setIsCursorVisible(isVisible);
    }, blinkDurationMs);

    setTimeout(() => {
      new Typer(props.textToType).startTyping(
        (typedText: string) => setCurrentValue(typedText),
        () => setTimeout(() => setIsCursorVisible(false), blinkDurationMs)
      );

      setIsCursorVisible(true);
      clearInterval(cursorInterval);
    }, blinkDurationMs * 2);
  }, []);

  return (
    <span style={isCursorVisible ? { borderRight: "2px solid white" } : null}>{currentValue}</span>
  );
};
