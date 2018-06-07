import {IKeyword} from "engraved-shared/dist";
import * as React from "react";
import {ChangeEvent, ReactNode} from "react";
import styled from "styled-components";
import {StyleConstants} from "../common/StyleConstants";
import {DropDown} from "./dropDown/DropDown";
import {IDropDownItemGroup} from "./dropDown/IDropDownItemGroup";
import {SelectedKeywords} from "./SelectedKeywords";

const ContainerDiv = styled.div`
  display: inline-block;
  position: relative;
  padding: ${StyleConstants.defaultPadding};
`;

const BoxInput = styled.input`
  font-size: ${StyleConstants.largeFontSize};
  border: 0;
  padding: ${StyleConstants.formElementPadding};
  
  &:focus {
    outline: none;
  }
`;

export interface IMagicBoxProps {
    value: string;
    onValueChange: (value: string) => void;
    onKeywordSelect: (keyword: IKeyword) => void;
    dropDownItemGroups: IDropDownItemGroup[];
    selectedKeywords: IKeyword[];
}

interface IMagicBoxState {
    hideDropDown: boolean;
}

export class MagicBox extends React.PureComponent<IMagicBoxProps, IMagicBoxState> {
    private input: HTMLInputElement;

    public static getDerivedStateFromProps(props: IMagicBoxProps, state: IMagicBoxState) {
        return {hideDropDown: false};
    }

    public render(): ReactNode {
        return (
            <ContainerDiv>
                <SelectedKeywords
                    selectedKeywords={this.props.selectedKeywords}
                    onKeywordSelect={this.props.onKeywordSelect}
                />
                <BoxInput
                    innerRef={(ref: HTMLInputElement) => this.input = ref}
                    type="text"
                    value={this.props.value}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                />
                <DropDown
                    hideDropDown={this.state.hideDropDown}
                    groups={this.props.dropDownItemGroups}
                />
            </ContainerDiv>
        );
    }

    public componentDidUpdate(prevProps: IMagicBoxProps, prevState: IMagicBoxState): void {
        if (!this.state.hideDropDown) {
            this.input.focus();
        }
    }

    private onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        this.props.onValueChange(e.target.value);
    };

    private onBlur = (): void => {
        // todo: why do we need such a high timeout here?
        setTimeout(() => this.setState({hideDropDown: true}), 500);
    };

    private onFocus = (): void => {
        this.setState({hideDropDown: false});
    };
}