import * as React from "react";
import styled from "styled-components";
import { StyleConstants } from "../../styling/StyleConstants";
import { StyleUtil } from "../../styling/StyleUtil";

export const FormContainer = styled.div`
  input,
  textarea,
  select {
    border: 1px solid ${StyleConstants.colors.discreet};
    margin-bottom: 10px;
    vertical-align: top;

    &:focus {
      outline: none;
      box-shadow: ${StyleConstants.defaultBoxShadow};
    }
  }

  button:hover {
    outline: none;
    box-shadow: ${StyleConstants.defaultBoxShadow};
  }

  input,
  textarea {
    padding: ${StyleConstants.formElementPadding};
    width: calc(
      100% - ${StyleConstants.formElementPadding} - ${StyleConstants.formElementPadding} - 2px
    );
    min-width: calc(
      100% - ${StyleConstants.formElementPadding} - ${StyleConstants.formElementPadding} - 2px
    );
    max-width: calc(
      100% - ${StyleConstants.formElementPadding} - ${StyleConstants.formElementPadding} - 2px
    );
  }

  select {
    width: 100%;
    padding: ${StyleConstants.formElementPadding} 0;
  }
`;

export const FormFieldContainer = styled.div``;

export const FormLabel = styled.label`
  display: block;
  padding-bottom: 1rem;
`;

export const BaseCell = styled.span``;

export const FormLabelSpan = BaseCell.extend`
  display: block;
  padding-bottom: 0.2rem;
  font-size: ${StyleConstants.font.small};
n`;

export const FormFieldSpan = BaseCell.extend`
  width: 100%;
`;

export const Input = styled.input``;

export const TextArea = styled.textarea`
  border: 0;
  padding: 0;
`;

export const Select = styled.select`
  option {
    padding: 0;
  }
`;

export interface IStyledButtonProps {
  text: string;
  background: string;
  border: string;
}

export const Button = styled.button<IStyledButtonProps>`
  background-color: ${p => p.background};
  color: ${p => p.text};
  border: 1px solid ${p => p.border};
  padding: 0.4rem 0.6rem;
  cursor: pointer;
  ${StyleUtil.normalizeAnchors("inherit")};

  &:focus {
    outline: none;
    box-shadow: ${StyleConstants.defaultBoxShadow};
  }
`;

export const FormButtonContainer = styled.div`
  button:not(:last-child) {
    margin-right: 1rem;
  }
`;
