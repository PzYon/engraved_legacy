import { ButtonStyle } from "./FormButton";

export interface IButton {
  onClick: () => void;
  link?: string;
  buttonStyle: ButtonStyle;
  label: string;
  fontSize?: string;
  useAsContextualAction?: boolean;
}
