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
      return this.renderRegularButton();
    }

    return (
      <>
        {this.renderRegularButton()}
        {this.renderConfirmationDialog()}
      </>
    );
  }

  private renderRegularButton() {
    return (
      <FormButton
        button={{
          buttonStyle: this.props.confirmableButton.buttonStyle,
          label: this.props.confirmableButton.label,
          onClick: () => this.setState({ showConfirmation: true })
        }}
      />
    );
  }

  private renderConfirmationDialog() {
    return (
      <Dialog title={this.props.confirmableButton.confirmationDialogTitle}>
        <FormButton
          button={{
            label: this.props.confirmableButton.cancelButtonLabel,
            buttonStyle: ButtonStyle.Secondary,
            onClick: () => this.setState({ showConfirmation: false })
          }}
        />
        <FormButton
          button={{
            label: this.props.confirmableButton.confirmationButtonLabel,
            buttonStyle: this.props.confirmableButton.confirmationButtonStyle,
            onClick: this.props.confirmableButton.onClick
          }}
        />
      </Dialog>
    );
  }
}
