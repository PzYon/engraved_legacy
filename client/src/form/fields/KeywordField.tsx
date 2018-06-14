import {IKeyword, Util} from "engraved-shared/dist";
import * as React from "react";
import {ReactNode} from "react";
import styled from "styled-components";
import {ErrorBoundary} from "../../common/ErrorBoundary";
import {ItemStore} from "../../common/items/ItemStore";
import {IDropDownItem} from "../../common/searchBox/dropDown/IDropDownItem";
import {IDropDownItemGroup} from "../../common/searchBox/dropDown/IDropDownItemGroup";
import {KeywordDropDownItem} from "../../common/searchBox/dropDown/items/KeywordDropDownItem";
import {SearchBox} from "../../common/searchBox/SearchBox";
import {FieldWrapper} from "./FieldWrapper";
import {IFieldProps} from "./IFieldProps";

export interface IKeywordFieldProps extends IFieldProps<IKeyword[]> {
    value: IKeyword[];
}

interface IKeywordFieldState {
    searchValue: string;
    dropDownItems: KeywordDropDownItem[];
    showDropDown: boolean;
}

const SearchBoxContainer = styled.div`
  margin-bottom: 10px;
`;

export class KeywordField extends React.PureComponent<IKeywordFieldProps, IKeywordFieldState> {
    public constructor(props: IKeywordFieldProps) {
        super(props);

        this.state = {
            dropDownItems: [],
            searchValue: "",
            showDropDown: true
        };
    }

    public render(): ReactNode {
        return (
            <FieldWrapper label={this.props.label}>
                {
                    this.props.isReadOnly
                    ? (this.props.value || []).map(k => k.name).join(", ")
                    : (
                        <SearchBoxContainer>
                            <SearchBox
                                searchValue={this.state.searchValue}
                                selectedKeywords={this.props.value}
                                dropDownItemGroups={this.getDropDownItemGroups()}
                                onKeywordSelect={this.handleKeywordSelect}
                                onChange={this.loadKeywordDropDownItems}
                            />
                        </SearchBoxContainer>
                    )
                }
            </FieldWrapper>
        );
    }

    private loadKeywordDropDownItems = (searchText: string): void => {
        if (!searchText) {
            this.setState({
                              dropDownItems: [],
                              showDropDown: false,
                              searchValue: searchText
                          });
        } else {
            ItemStore.instance
                     .searchKeywords(searchText)
                     .subscribe((keywords: IKeyword[]) => {
                         this.setState({
                                           dropDownItems: (keywords || []).map(k => new KeywordDropDownItem(k)),
                                           showDropDown: true,
                                           searchValue: searchText
                                       });
                     }, (error: Error) => ErrorBoundary.ensureError(this, error));
        }
    };

    private getDropDownItemGroups = (): IDropDownItemGroup[] => {
        if (!this.state.searchValue) {
            return [];
        }

        return [
            {
                items: this.state.dropDownItems.length
                       ? this.state.dropDownItems
                       : [KeywordField.getCreateKeywordDropDownItem(this.state.searchValue)],
                onSelectItem: (item: IDropDownItem<IKeyword>) => {
                    this.handleKeywordSelect(item.item);
                }
            }
        ];
    };

    private handleKeywordSelect = (keyword: IKeyword): void => {
        // todo: consider using https://github.com/kolodny/immutability-helper instead
        const keywords: IKeyword[] = JSON.parse(JSON.stringify(this.props.value));

        Util.toggleArrayValue(keywords,
                              keyword,
                              (currentElement) => currentElement.name === keyword.name);

        this.setState({
                          dropDownItems: [],
                          showDropDown: false,
                          searchValue: ""
                      });

        this.props.onValueChange(keywords);
    };

    private static getCreateKeywordDropDownItem = (name: string): IDropDownItem<IKeyword> => {
        return {
            item: {name: name},
            nodeOrLabel: `Create keyword "${name}"`,
            key: name
        };
    };
}