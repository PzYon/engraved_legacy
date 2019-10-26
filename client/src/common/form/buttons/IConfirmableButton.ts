import { ButtonStyle } from "./FormButton";
import { IButton } from "./IButton";

export interface IConfirmableButton extends IButton {
  confirmationDialogTitle: string;
  confirmationButtonLabel: string;
  confirmationButtonStyle: ButtonStyle;
  cancelButtonLabel: string;
  onClick: () => void;
}
