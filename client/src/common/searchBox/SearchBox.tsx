import { IKeyword } from "engraved-shared";
import * as React from "react";
import { ChangeEvent, ReactNode } from "react";
import styled from "styled-components";
import { If } from "../If";
import { DropDown } from "./dropDown/DropDown";
import { IDropDownItemGroup } from "./dropDown/IDropDownItemGroup";
import { SelectedKeywords } from "./SelectedKeywords";

const ContainerDiv = styled.div`
  position: relative;
  width: 100%;
`;

interface IInnerContainerDivStyle {
  isHighlight: boolean;
}

const InnerContainerDiv = styled.div<IInnerContainerDivStyle>`
  background-color: ${p => p.theme.colors.ultraDiscreet};
  border: 1px solid ${p => p.theme.colors.discreet};
  overflow: hidden;
  ${p => (p.isHighlight ? `box-shadow: ${p.theme.defaultBoxShadow};` : "")};
`;

const Input = styled.input`
  box-sizing: border-box;
  height: 42px;
  width: 100% !important;
  min-width: 100% !important;
  max-width: 100% !important;
  margin-bottom: 0 !important;
  padding: ${p => p.theme.formElementPadding};
  border: 0 !important;
  border-top: 1px solid ${p => p.theme.colors.discreet} !important;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${p => p.theme.colors.discreet};
  }
`;

export interface ISearchBoxProps {
  selectedKeywords: IKeyword[];
  onKeywordSelect: (keyword: IKeyword) => void;
  dropDownItemGroups: IDropDownItemGroup[];
  onChange: (value: string) => void;
  searchValue: string;
  placeholder?: string;
  giveFocusOnLoad?: boolean;
}

interface ISearchBoxState {
  showDropDown: boolean;
  hidePlaceholder: boolean;
  hasFocus: boolean;
}

export class SearchBox extends React.Component<ISearchBoxProps, ISearchBoxState> {
  private container = React.createRef<HTMLDivElement>();

  private input = React.createRef<HTMLInputElement>();

  public readonly state: ISearchBoxState = {
    showDropDown: true,
    hidePlaceholder: false,
    hasFocus: false
  };

  public render(): ReactNode {
    return (
      <ContainerDiv ref={this.container}>
        <InnerContainerDiv isHighlight={this.state.hasFocus} className={"search-box-inner"}>
          <SelectedKeywords
            selectedKeywords={this.props.selectedKeywords}
            onKeywordSelect={this.props.onKeywordSelect}
          />
          <Input
            type="text"
            value={this.props.searchValue}
            ref={this.input}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              this.props.onChange(e.target.value);
              this.setState({
                showDropDown: true
              });
            }}
            onFocus={() =>
              this.setState({
                showDropDown: true,
                hidePlaceholder: true,
                hasFocus: true
              })
            }
            onBlur={() =>
              this.setState({
                hasFocus: false
              })
            }
            placeholder={this.state.hidePlaceholder ? "" : this.props.placeholder}
          />
        </InnerContainerDiv>
        <If
          value={this.state.showDropDown}
          render={() => (
            <DropDown
              groups={this.props.dropDownItemGroups}
              onClose={() => this.setState({ showDropDown: false })}
            />
          )}
        />
      </ContainerDiv>
    );
  }

  public componentDidMount(): void {
    document.addEventListener("mousedown", this.handleDocumentClick, false);

    if (this.props.giveFocusOnLoad) {
      this.input.current.focus();
      this.input.current.select();
    }
  }

  public componentWillUnmount(): void {
    document.removeEventListener("mousedown", this.handleDocumentClick, false);
  }

  private handleDocumentClick = (e: any): void => {
    if (this.container.current && this.container.current.contains(e.target)) {
      return;
    }

    this.setState({ showDropDown: false });
  };
}
