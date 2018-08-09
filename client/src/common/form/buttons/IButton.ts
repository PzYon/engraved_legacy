import { ReactNode } from "react";
import { ButtonStyle } from "./FormButton";

export interface IButton {
  onClick: () => void;
  buttonStyle: ButtonStyle;
  nodeOrLabel: ReactNode;
}
