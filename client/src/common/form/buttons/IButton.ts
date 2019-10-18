import { IAction } from "../../IAction";
import { ButtonStyle } from "./FormButton";

export interface IButton extends IAction {
  buttonStyle: ButtonStyle;
  fontSize?: string;
  useAsContextualAction?: boolean;
}
