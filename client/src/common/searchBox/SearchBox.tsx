import {IKeyword} from "engraved-shared/dist";
import * as React from "react";
import {ChangeEvent, ReactNode} from "react";
import styled from "styled-components";
import {StyleConstants} from "../StyleConstants";
import {DropDown} from "./dropDown/DropDown";
import {IDropDownItemGroup} from "./dropDown/IDropDownItemGroup";
import {SelectedKeywords} from "./SelectedKeywords";

const ContainerDiv = styled.div`
  position: relative;
`;

const Input = styled.input`
  font-size: ${StyleConstants.largeFontSize};
  border: 0;
  padding: ${StyleConstants.formElementPadding};
  margin-bottom: 0 !important;
  
  &:focus {
    outline: none;
  }
`;

export interface ISearchBoxProps {
    selectedKeywords: IKeyword[];
    onKeywordSelect: (keyword: IKeyword) => void;
    dropDownItemGroups: IDropDownItemGroup[];
    onChange: (value: string) => void;
    searchValue: string;
}

interface ISearchBoxState {
    showDropDown: boolean;
}

export class SearchBox extends React.Component<ISearchBoxProps, ISearchBoxState> {
    private node: HTMLDivElement;

    public constructor(props: ISearchBoxProps) {
        super(props);

        this.state = {showDropDown: true};
    }

    public render(): ReactNode {
        return (
            <ContainerDiv innerRef={ref => this.node = ref}>
                <SelectedKeywords
                    selectedKeywords={this.props.selectedKeywords}
                    onKeywordSelect={this.props.onKeywordSelect}
                />
                <Input
                    type="text"
                    value={this.props.searchValue}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => this.props.onChange(e.target.value)}
                    onFocus={() => this.setState({showDropDown: true})}
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