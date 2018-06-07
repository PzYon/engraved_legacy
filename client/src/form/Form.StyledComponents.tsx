import styled from "styled-components";
import {StyleConstants} from "../common/StyleConstants";

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
