import { ReactNode } from "react";
import { ButtonStyle } from "./FormButton";

export interface IConfirmableButton {
  initialButtonNodeOrLabel: ReactNode;
  initialButtonStyle: ButtonStyle;
  confirmationDialogTitle: string;
  confirmationButtonNodeOrLabel: ReactNode;
  confirmationButtonStyle: ButtonStyle;
  cancelButtonNodeOrLabel: ReactNode;
  onClick: () => void;
}
