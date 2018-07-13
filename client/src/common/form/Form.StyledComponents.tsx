import styled from "styled-components";
import {StyleConstants} from "../../styling/StyleConstants";
import {StyleUtil} from "../../styling/StyleUtil";

export const FormContainer = styled.div`
  input,
  textarea,
  select,
  button {
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
    width: calc(100% - ${StyleConstants.formElementPadding} - ${StyleConstants.formElementPadding} - 2px);
    min-width: calc(100% - ${StyleConstants.formElementPadding} - ${StyleConstants.formElementPadding} - 2px);
    max-width: calc(100% - ${StyleConstants.formElementPadding} - ${StyleConstants.formElementPadding} - 2px);
  }

  select {
    width: 100%;
    padding: ${StyleConstants.formElementPadding} 0;
  }
`;

export const FormFieldContainer = styled.div` 
`;

export const FormLabel = styled.label`
  display: block;
  padding-bottom: 0.7rem;
`;

export const BaseCell = styled.span`
`;

export const FormLabelSpan = BaseCell.extend`
  display: block;
  padding-bottom: 0.2rem;
  font-size: 0.7rem;
  color: ${StyleConstants.colors.accent};
`;

export const FormFieldSpan = BaseCell.extend`
  width: 100%;
`;

export const Input = styled.input`
`;

export const TextArea = styled.textarea`
  border: 0;
  padding: 0;
`;

export const Select = styled.select`
  option {
    padding: 0;
  }
`;

export const Button = styled.button`
  background-color: ${(p: { isPrimary: boolean }) => p.isPrimary
                                                     ? StyleConstants.colors.accent
                                                     : StyleConstants.colors.pageBackground};
  color: ${(p: { isPrimary: boolean }) => p.isPrimary
                                          ? StyleConstants.colors.pageBackground
                                          : StyleConstants.colors.accent};
  border: 1px solid ${StyleConstants.colors.accent};
  padding: 0.4rem 0.6rem;
  cursor: pointer;
  ${StyleUtil.normalizeAnchors("inherit")}
`;

export const FormButtonContainer = styled.div`
  margin-top: 1rem;

  button:not(:last-child) {
    margin-right: 1rem;
  }
`;
