import { ButtonStyle } from "./FormButton";

export interface IConfirmableButton {
  initialButtonLabel: string;
  initialButtonStyle: ButtonStyle;
  confirmationDialogTitle: string;
  confirmationButtonLabel: string;
  confirmationButtonStyle: ButtonStyle;
  cancelButtonLabel: string;
  onClick: () => void;
}
