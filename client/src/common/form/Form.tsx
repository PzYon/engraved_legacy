import { IItem, IKeyword, ItemKind } from "engraved-shared";
import * as React from "react";
import { ReactNode } from "react";
import { Redirect } from "react-router";
import { ItemKindRegistrationManager } from "../../items/ItemKindRegistrationManager";
import { ConfirmableButton } from "./buttons/ConfirmableButton";
import { ButtonStyle, FormButton } from "./buttons/FormButton";
import { IButton } from "./buttons/IButton";
import { IConfirmableButton } from "./buttons/IConfirmableButton";
import { KeywordField } from "./fields/keyword/KeywordField";
import { SelectField } from "./fields/select/SelectField";
import { MultiLineTextField } from "./fields/text/MultiLineTextField";
import {
  FormButtonContainer,
  FormContainer,
  FormFieldContainer
} from "./Form.StyledComponents";
import { FormValidator } from "./validation/FormValidator";
import { IValidatedFields } from "./validation/IValidatedFields";

export interface IFormProps {
  item: IItem | undefined;

  isReadonly: boolean;

  createButtons(
    isDirty: boolean,
    isValid: boolean,
    validate: () => boolean,
    item: IItem
  ): IButton[];
}

interface IFormState {
  item: IItem;
  validatedFields: IValidatedFields;
  isValid: boolean;
  isDirty: boolean;
  isClose: boolean;
}

export class Form extends React.Component<IFormProps, IFormState> {
  private readonly initialItemJson: string;
  private changeToken: string = Math.random().toString();

  public constructor(props: IFormProps) {
    super(props);

    this.initialItemJson = JSON.stringify(props.item);
    this.state = this.createState(JSON.parse(this.initialItemJson), {});
  }

  public render(): ReactNode {
    if (this.state.isClose) {
      return <Redirect to="/" push={true} />;
    }

    const item: IItem = this.state.item;
    if (!item) {
      return null;
    }

    return (
      <FormContainer>
        <FormFieldContainer>
          <SelectField
            label={"Item Kind"}
            value={item.itemKind}
            valueLabel={ItemKindRegistrationManager.getItemKindLabel(
              item.itemKind
            )}
            onValueChange={(value: ItemKind) =>
              this.onValueChange("itemKind", value)
            }
            validationMessage={FormValidator.getValidationMessage(
              this.state.validatedFields,
              "itemKind"
            )}
            options={ItemKindRegistrationManager.getItemKindOptions()}
            defaultKey={item.itemKind}
            isReadOnly={this.props.isReadonly}
          />
          <MultiLineTextField
            label={"Description"}
            onValueChange={(value: string) =>
              this.onValueChange("description", value)
            }
            value={item.description}
            isReadOnly={this.props.isReadonly}
          />
          {this.getKindSpecificFields(item)}
          <KeywordField
            label={"Keywords"}
            onValueChange={(value: IKeyword[]) =>
              this.onValueChange("keywords", value)
            }
            value={item.keywords || []}
            isReadOnly={this.props.isReadonly}
          />
        </FormFieldContainer>
        <FormButtonContainer>
          {this.props
            .createButtons(
              this.state.isDirty,
              this.state.isValid,
              () => this.validateItem(item),
              item
            )
            .map(this.createButton)}
          <FormButton
            key={"Cancel"}
            changeToken={this.changeToken}
            button={{
              onClick: (): void => this.setState({ isClose: true }),
              label: this.state.isDirty ? "Discard" : "Close",
              buttonStyle: ButtonStyle.Secondary,
              isContextualAction: true
            }}
          />
        </FormButtonContainer>
      </FormContainer>
    );
  }

  private createButton = (button: IButton): ReactNode => {
    const key = button.label;

    if ((button as IConfirmableButton).cancelButtonLabel) {
      return (
        <ConfirmableButton
          key={key}
          confirmableButton={button as IConfirmableButton}
        />
      );
    }

    return (
      <FormButton changeToken={this.changeToken} key={key} button={button} />
    );
  };

  private validateItem(item: IItem): boolean {
    const validatedFields = FormValidator.validateItem(item);
    const isValid: boolean = Object.keys(validatedFields).length === 0;

    this.setState({
      validatedFields: validatedFields,
      isValid: isValid
    });

    return isValid;
  }

  private getKindSpecificFields(item: IItem): ReactNode {
    return !item
      ? null
      : ItemKindRegistrationManager.resolve(item.itemKind).getEditFormFields(
          item,
          this.props.isReadonly,
          this.state.validatedFields,
          this.onValueChange
        );
  }

  public onValueChange = (fieldName: string, value: any): void => {
    this.setState((prevState: IFormState) => {
      if (prevState.item[fieldName] === value) {
        return null;
      }

      this.changeToken = Math.random().toString();

      const defaultValues =
        fieldName === "itemKind"
          ? ItemKindRegistrationManager.resolve(
              value as ItemKind
            ).getDefaultProperties()
          : {};

      const updatedField = { [fieldName]: value };
      const updatedItem = {
        ...defaultValues,
        ...prevState.item,
        ...updatedField
      };

      const updatedValidations = { ...prevState.validatedFields };

      const validationMessage: string = FormValidator.validateField(
        updatedItem,
        fieldName
      );
      if (validationMessage) {
        updatedValidations[fieldName] = validationMessage;
      } else {
        delete updatedValidations[fieldName];
      }

      return this.createState(updatedItem, updatedValidations);
    });
  };

  private createState(
    item: IItem,
    validatedFields: IValidatedFields
  ): IFormState {
    return {
      item: item,
      validatedFields: validatedFields,
      isClose: false,
      isDirty: JSON.stringify(item) !== this.initialItemJson,
      isValid: Object.keys(validatedFields).every((key: string) => {
        return !validatedFields[key];
      })
    };
  }
}
