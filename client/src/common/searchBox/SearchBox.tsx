import {IKeyword} from "engraved-shared/dist";
import * as React from "react";
import {ChangeEvent, ReactNode} from "react";
import styled from "styled-components";
import {StyleConstants} from "../styling/StyleConstants";
import {DropDown} from "./dropDown/DropDown";
import {IDropDownItemGroup} from "./dropDown/IDropDownItemGroup";
import {SelectedKeywords} from "./SelectedKeywords";

const ContainerDiv = styled.div`
  position: relative;
  ${(p: { isHighlight: boolean }) => p.isHighlight ? `box-shadow: ${StyleConstants.defaultBoxShadow};` : ""}
`;

const Input = styled.input`
  font-size: ${StyleConstants.largeFontSize};
  border: 1px solid ${StyleConstants.colors.borders};
  padding: ${StyleConstants.formElementPadding};
  margin-bottom: 0 !important;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${StyleConstants.colors.accent};
  }
`;

export interface ISearchBoxProps {
    selectedKeywords: IKeyword[];
    onKeywordSelect: (keyword: IKeyword) => void;
    dropDownItemGroups: IDropDownItemGroup[];
    onChange: (value: string) => void;
    searchValue: string;
    placeholder?: string;
}

interface ISearchBoxState {
    showDropDown: boolean;
    hidePlaceholder: boolean;
    isFocus: boolean;
    isHover: boolean;
}

export class SearchBox extends React.Component<ISearchBoxProps, ISearchBoxState> {
    private node: HTMLDivElement;

    public constructor(props: ISearchBoxProps) {
        super(props);

        this.state = {
            showDropDown: true,
            hidePlaceholder: false,
            isFocus: false,
            isHover: false
        };
    }

    public render(): ReactNode {
        return (
            <ContainerDiv
                innerRef={ref => this.node = ref}
                onMouseOver={() => this.setState({isHover: true})}
                onMouseLeave={() => this.setState({isHover: false})}
                isHighlight={this.state.isFocus || this.state.isHover}
            >
                <SelectedKeywords
                    selectedKeywords={this.props.selectedKeywords}
                    onKeywordSelect={this.props.onKeywordSelect}
                />
                <Input
                    type="text"
                    value={this.props.searchValue}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => this.props.onChange(e.target.value)}
                    onFocus={() => this.setState({showDropDown: true, hidePlaceholder: true, isFocus: true})}
                    onBlur={() => this.setState({isFocus: false})}
                    placeholder={this.state.hidePlaceholder ? "" : this.props.placeholder}
                />
                {
                    this.state.showDropDown
                    && (
                        <DropDown
                            groups={this.props.dropDownItemGroups}
                        />
                    )
                }
            </ContainerDiv>
        );
    }

    public componentDidMount(): void {
        document.addEventListener("mousedown", this.handleDocumentClick, false);
    }

    public componentWillUnmount(): void {
        document.removeEventListener("mousedown", this.handleDocumentClick, false);
    }

    private handleDocumentClick = (e: any): void => {
        if (this.node && this.node.contains(e.target)) {
            return;
        }

        this.setState({showDropDown: false});
    };
}