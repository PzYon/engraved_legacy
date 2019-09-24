import * as React from "react";
import { ITheme } from "../../../styling/ITheme";
import { useTheme } from "../../Hooks";
import { Button, IButtonStyle, LinkLikeButton } from "../Form.StyledComponents";
import { IButton } from "./IButton";

export enum ButtonStyle {
  Primary,
  Secondary,
  Red,
  Green,
  LinkLike,
  Disabled
}

export interface IButtonProps {
  button: IButton;
}

export const FormButton = (props: IButtonProps) => {
  const theme = useTheme();

  const ButtonElement = props.button.buttonStyle === ButtonStyle.LinkLike ? LinkLikeButton : Button;

  return (
    <ButtonElement
      type={"button"}
      className={"ngrvd-button"}
      onClick={props.button.onClick}
      {...(props.button.buttonStyle === ButtonStyle.Disabled ? { disabled: "disabled" } : null)}
      {...(props.button.fontSize ? { style: { fontSize: props.button.fontSize } } : null)}
      {...getColors(props.button.buttonStyle, theme)}
    >
      {props.button.nodeOrLabel}
    </ButtonElement>
  );
};

const getColors = (buttonStyle: ButtonStyle, theme: ITheme): IButtonStyle => {
  switch (buttonStyle) {
    case ButtonStyle.Green:
      return {
        text: theme.colors.success.text,
        background: theme.colors.success.background,
        border: theme.colors.success.background
      };
    case ButtonStyle.Red:
      return {
        text: theme.colors.error.text,
        background: theme.colors.error.background,
        border: theme.colors.error.background
      };
    case ButtonStyle.Primary:
      return {
        text: theme.colors.accentContrast,
        background: theme.colors.accent,
        border: theme.colors.accent
      };
    case ButtonStyle.Secondary:
      return {
        text: theme.colors.accent,
        background: theme.colors.accentContrast,
        border: theme.colors.accent
      };
    case ButtonStyle.LinkLike:
      return {
        text: theme.colors.accent,
        background: "none",
        border: "none"
      };
    case ButtonStyle.Disabled:
      return {
        text: theme.colors.text,
        background: theme.colors.palette.shades.lightest,
        border: theme.colors.palette.shades.dark
      };
  }
};
