import styled from "styled-components";
import {StyleConstants} from "../styling/StyleConstants";
import {StyleUtil} from "../styling/StyleUtil";

export const FormFieldContainer = styled.div`
  display: table;
  
  input,
  textarea,
  select {
    border: 0;
    margin-bottom: 10px;
    vertical-align: top;
    &:focus {
      outline: none;
    }
  }
  
  input,
  textarea {
    padding: ${StyleConstants.formElementPadding};
    width: calc(100% - ${StyleConstants.formElementPadding} - ${StyleConstants.formElementPadding});
    min-width: calc(100% - ${StyleConstants.formElementPadding} - ${StyleConstants.formElementPadding});
    max-width: calc(100% - ${StyleConstants.formElementPadding} - ${StyleConstants.formElementPadding});
  }
  
  select {
    width: 100%;
    padding: ${StyleConstants.formElementPadding} 0;
  }
`;

export const FormLabel = styled.label`
  display: table-row;
`;

export const BaseCell = styled.span`
  display: table-cell;
  vertical-align: top;
`;

export const FormLabelSpan = BaseCell.extend`
  padding-right: 20px;
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
                                                     ? StyleConstants.colors.accent.default
                                                     : StyleConstants.colors.pageBackground};
  color: ${(p: { isPrimary: boolean }) => p.isPrimary
                                          ? StyleConstants.colors.pageBackground
                                          : StyleConstants.colors.accent.default};
  border: 1px solid ${StyleConstants.colors.accent.default};
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
