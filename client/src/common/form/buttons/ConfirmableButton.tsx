import * as React from "react";
import { ReactNode } from "react";
import { Dialog } from "../../Dialog";
import { ButtonStyle, FormButton } from "./FormButton";
import { IConfirmableButton } from "./IConfirmableButton";

export interface IConfirmableButtonProps {
  confirmableButton: IConfirmableButton;
}

interface IConfirmableButtonState {
  showConfirmation: boolean;
}

export class ConfirmableButton extends React.PureComponent<
  IConfirmableButtonProps,
  IConfirmableButtonState
> {
  public readonly state: IConfirmableButtonState = {
    showConfirmation: false
  };

  public render(): ReactNode {
    if (!this.state.showConfirmation) {
      return (
        <FormButton
          button={{
            buttonStyle: this.props.confirmableButton.initialButtonStyle,
            nodeOrLabel: this.props.confirmableButton.initialButtonNodeOrLabel,
            onClick: () => this.setState({ showConfirmation: true })
          }}
        />
      );
    } else {
      return (
        <Dialog title={this.props.confirmableButton.confirmationDialogTitle}>
          <FormButton
            button={{
              nodeOrLabel: this.props.confirmableButton.cancelButtonNodeOrLabel,
              buttonStyle: ButtonStyle.Secondary,
              onClick: () => this.setState({ showConfirmation: false })
            }}
          />
          <FormButton
            button={{
              nodeOrLabel: this.props.confirmableButton.confirmationButtonNodeOrLabel,
              buttonStyle: this.props.confirmableButton.confirmationButtonStyle,
              onClick: this.props.confirmableButton.onClick
            }}
          />
        </Dialog>
      );
    }
  }
}
