import { IAction } from "../../../actions/IAction";
import { ButtonStyle } from "./FormButton";

export interface IButton extends IAction {
  buttonStyle: ButtonStyle;
  fontSize?: string;
}
