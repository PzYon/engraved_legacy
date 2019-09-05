import * as React from "react";
import { ReactNode } from "react";
import { StyleConstants } from "../../../styling/StyleConstants";
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

export class FormButton extends React.Component<IButtonProps> {
  public render(): ReactNode {
    const ButtonElement =
      this.props.button.buttonStyle === ButtonStyle.LinkLike ? LinkLikeButton : Button;

    return (
      <ButtonElement
        className={"ngrvd-button"}
        onClick={this.props.button.onClick}
        {...(this.props.button.buttonStyle === ButtonStyle.Disabled
          ? { disabled: "disabled" }
          : null)}
        {...this.getColors(this.props.button.buttonStyle)}
        {...(this.props.button.fontSize
          ? { style: { fontSize: this.props.button.fontSize } }
          : null)}
      >
        {this.props.button.nodeOrLabel}
      </ButtonElement>
    );
  }

  private getColors = (buttonStyle: ButtonStyle): IButtonStyle => {
    switch (buttonStyle) {
      case ButtonStyle.Green:
        return {
          text: StyleConstants.colors.success.text,
          background: StyleConstants.colors.success.background,
          border: StyleConstants.colors.success.background
        };
      case ButtonStyle.Red:
        return {
          text: StyleConstants.colors.error.text,
          background: StyleConstants.colors.error.background,
          border: StyleConstants.colors.error.background
        };
      case ButtonStyle.Primary:
        return {
          text: StyleConstants.colors.pageBackground,
          background: StyleConstants.colors.accent,
          border: StyleConstants.colors.accent
        };
      case ButtonStyle.Secondary:
        return {
          text: StyleConstants.colors.accent,
          background: StyleConstants.colors.pageBackground,
          border: StyleConstants.colors.accent
        };
      case ButtonStyle.LinkLike:
        return {
          text: StyleConstants.colors.accent,
          background: "none",
          border: "none"
        };
      case ButtonStyle.Disabled:
        return {
          text: StyleConstants.colors.font,
          background: StyleConstants.colors.discreet,
          border: StyleConstants.colors.discreet
        };
    }
  };
}
