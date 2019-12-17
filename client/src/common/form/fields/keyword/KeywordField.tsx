import { IKeyword, Util } from "engraved-shared";
import * as React from "react";
import { ReactNode } from "react";
import { Subscription } from "rxjs";
import styled from "styled-components";
import { ItemStore } from "../../../../items/ItemStore";
import { ErrorBoundary } from "../../../ErrorBoundary";
import { IDropDownItem } from "../../../searchBox/dropDown/IDropDownItem";
import { IDropDownItemGroup } from "../../../searchBox/dropDown/IDropDownItemGroup";
import { SearchBox } from "../../../searchBox/SearchBox";
import { FieldWrapper } from "../FieldWrapper";
import { IFieldProps } from "../IFieldProps";
import { IKeywordDropDownItem } from "./IKeywordDropDownItem";

export interface IKeywordFieldProps extends IFieldProps<IKeyword[]> {}

interface IKeywordFieldState {
  searchValue: string;
  dropDownItems: Array<IDropDownItem<IKeywordDropDownItem>>;
  showDropDown: boolean;
}

const SearchBoxContainer = styled.div``;

export class KeywordField extends React.PureComponent<
  IKeywordFieldProps,
  IKeywordFieldState
> {
  public readonly state: IKeywordFieldState = {
    dropDownItems: [],
    searchValue: "",
    showDropDown: true
  };

  private findTimer: any;
  private findSubscription: Subscription;

  public render(): ReactNode {
    const keywords: IKeyword[] = this.props.value || [];

    return (
      <FieldWrapper
        label={this.props.label}
        validationError={this.props.validationMessage}
      >
        {this.props.isReadOnly ? (
          keywords.map(k => k.name).join(", ")
        ) : (
          <SearchBoxContainer>
            <SearchBox
              searchValue={this.state.searchValue}
              selectedKeywords={keywords}
              dropDownItemGroups={this.getDropDownItemGroups()}
              onKeywordSelect={this.handleKeywordSelect}
              onChange={this.loadKeywordDropDownItems}
            />
          </SearchBoxContainer>
        )}
      </FieldWrapper>
    );
  }

  private loadKeywordDropDownItems = (searchText: string): void => {
    if (this.findTimer) {
      clearTimeout(this.findTimer);
    }

    if (!searchText) {
      this.setState({
        dropDownItems: [],
        showDropDown: false,
        searchValue: ""
      });

      return;
    }

    this.setState({ searchValue: searchText });

    this.findTimer = setTimeout(() => {
      if (this.findSubscription) {
        this.findSubscription.unsubscribe();
      }

      this.findSubscription = ItemStore.instance
        .searchKeywords(searchText)
        .subscribe(
          (keywords: IKeyword[]) => {
            this.setState({
              dropDownItems: (keywords || []).map(k => {
                return {
                  item: { label: k.name, keyword: k },
                  key: k.name
                };
              }),
              showDropDown: true
            });
          },
          (error: Error) => ErrorBoundary.ensureError(this, error)
        );
    }, 400);
  };

  private getDropDownItemGroups = (): IDropDownItemGroup[] => {
    if (!this.state.searchValue) {
      return [];
    }

    const groups: IDropDownItemGroup[] = [];

    if (this.state.dropDownItems.length) {
      groups.push({
        title: "Keywords",
        items: this.state.dropDownItems,
        onSelectItem: this.handleGroupItemSelect
      });
    }

    const isNewKeyword: boolean =
      this.state.dropDownItems
        .map(d => d.item.keyword.name.toLowerCase())
        .indexOf(this.state.searchValue.toLowerCase()) === -1;

    if (isNewKeyword) {
      const name = this.state.searchValue;

      groups.push({
        title: "Actions",
        items: [
          {
            item: {
              label: `Create keyword "${name}"`,
              keyword: {
                name: name,
                user_id: null
              }
            } as IKeywordDropDownItem,
            key: name
          }
        ],
        onSelectItem: this.handleGroupItemSelect
      });
    }

    return groups;
  };

  private handleGroupItemSelect = (
    item: IDropDownItem<IKeywordDropDownItem>
  ): void => {
    this.handleKeywordSelect(item.item.keyword);
  };

  private handleKeywordSelect = (keyword: IKeyword): void => {
    // todo: consider using https://github.com/kolodny/immutability-helper instead
    const keywords: IKeyword[] = JSON.parse(JSON.stringify(this.props.value));

    Util.toggleArrayValue(
      keywords,
      keyword,
      currentElement => currentElement.name === keyword.name
    );

    this.setState({
      dropDownItems: [],
      showDropDown: false,
      searchValue: ""
    });

    this.props.onValueChange(keywords);
  };
}
