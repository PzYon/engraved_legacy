import * as React from "react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ActionsContext } from "../../../actions/ActionsContext";
import { IAction } from "../../../actions/IAction";
import { ITheme } from "../../../styling/ITheme";
import { useTheme } from "../../Hooks";
import {
  Button,
  FormButtonContainer,
  IButtonStyle,
  LinkLikeButton
} from "../Form.StyledComponents";
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
  const button = props.button;

  const theme = useTheme();
  const actionsContext = useContext(ActionsContext);

  useEffect(() => {
    console.log("executing effect on action: " + button.label);
    if (button.useAsContextualAction && button.buttonStyle !== ButtonStyle.Disabled) {
      actionsContext.dispatch({ action: button, key: "add" });

      return () => {
        actionsContext.dispatch({ action: button, key: "remove" });
      };
    } else {
      return undefined;
    }
  }, [button.url, button.label, button.buttonStyle]);

  const ButtonElement = button.buttonStyle === ButtonStyle.LinkLike ? LinkLikeButton : Button;

  return (
    <ButtonElement
      key={button.label}
      type={"button"}
      className={"ngrvd-button"}
      onClick={button.onClick}
      {...(button.buttonStyle === ButtonStyle.Disabled ? { disabled: "disabled" } : null)}
      {...(button.fontSize ? { style: { fontSize: button.fontSize } } : null)}
      {...getColors(button.buttonStyle, theme)}
    >
      {button.url ? <Link to={button.url}>{button.label}</Link> : button.label}
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
