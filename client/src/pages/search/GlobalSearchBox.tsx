import { IKeyword, ItemKind } from "engraved-shared";
import * as React from "react";
import { ReactNode } from "react";
import { Redirect } from "react-router";
import { Subscription } from "rxjs";
import styled, { css } from "styled-components";
import { ErrorBoundary } from "../../common/ErrorBoundary";
import { IRedirection } from "../../common/IRedirection";
import { IDropDownItem } from "../../common/searchBox/dropDown/IDropDownItem";
import { IDropDownItemGroup } from "../../common/searchBox/dropDown/IDropDownItemGroup";
import { SearchBox } from "../../common/searchBox/SearchBox";
import { ItemStore } from "../../items/ItemStore";
import { StyleConstants } from "../../styling/StyleConstants";

interface IWrapperDivStyle {
  showDropDown: boolean;
}

const WrapperDiv = styled.div<IWrapperDivStyle>`
  .search-box-inner {
    border-radius: ${StyleConstants.borderRadius};
    border: 1px solid ${StyleConstants.colors.discreet};

    ${p =>
      p.showDropDown
        ? css`
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          `
        : ""};
  }
`;

interface IGlobalSearchBoxState {
  searchValue: string;
  keywordSearchValue: string;
  showDropDown: boolean;
  keywordDropDownItems: Array<IDropDownItem<IKeyword>>;
  actionDropDownItems: Array<IDropDownItem<IRedirection>>;
  selectedKeywords: IKeyword[];
  redirectToUrl: string;
}

export class GlobalSearchBox extends React.PureComponent<{}, IGlobalSearchBoxState> {
  private findOnTypeTimer: any;

  private keywordsSubscription: Subscription;

  public constructor(props: {}) {
    super(props);

    this.state = {
      searchValue: ItemStore.instance.searchText,
      keywordSearchValue: "",
      showDropDown: true,
      actionDropDownItems: [],
      keywordDropDownItems: [],
      selectedKeywords: [],
      redirectToUrl: null
    };
  }

  public componentDidMount(): void {
    this.keywordsSubscription = ItemStore.instance.keywords$.subscribe(keywords =>
      this.setState({ selectedKeywords: keywords })
    );
  }

  public componentWillUnmount(): void {
    if (this.keywordsSubscription) {
      this.keywordsSubscription.unsubscribe();
    }
  }

  public render(): ReactNode {
    if (this.state.redirectToUrl) {
      return <Redirect to={this.state.redirectToUrl} push={true} />;
    }

    const dropDownItemGroups = this.getDropDownItemGroups();

    return (
      <WrapperDiv showDropDown={dropDownItemGroups.length > 0 && this.state.showDropDown}>
        <SearchBox
          selectedKeywords={ItemStore.instance.keywords$.value}
          onKeywordSelect={this.handleKeywordSelect}
          dropDownItemGroups={dropDownItemGroups}
          onChange={this.onChange}
          searchValue={this.state.searchValue}
        />
      </WrapperDiv>
    );
  }

  private onChange = (value: string): void => {
    this.setState({ searchValue: value });

    ItemStore.instance.searchText = value;

    this.setActionDropDownItems(value);

    if (this.findOnTypeTimer) {
      clearTimeout(this.findOnTypeTimer);
    }

    this.findOnTypeTimer = setTimeout(() => {
      ItemStore.instance.loadItems();
      this.setKeywordDropDownItems(value);
    }, 400);
  };

  private getDropDownItemGroups = (): IDropDownItemGroup[] => {
    const dropDownGroups: IDropDownItemGroup[] = [];

    if (this.state.actionDropDownItems.length) {
      dropDownGroups.push({
        title: "Actions",
        items: this.state.actionDropDownItems,
        onSelectItem: (item: IDropDownItem<IRedirection>) => {
          this.setState({
            redirectToUrl: item.item.url
          });
        }
      });
    }

    if (this.state.keywordDropDownItems.length) {
      dropDownGroups.push({
        title: "Keywords",
        items: this.state.keywordDropDownItems,
        onSelectItem: (item: IDropDownItem<IKeyword>) => {
          this.handleKeywordSelect(item.item);
        }
      });
    }

    return dropDownGroups;
  };

  private handleKeywordSelect = (keyword: IKeyword) => {
    const isNew: boolean = ItemStore.instance.toggleKeyword(keyword);

    if (isNew) {
      const i = this.state.searchValue.lastIndexOf(this.state.keywordSearchValue);
      if (i > -1) {
        const newBoxValue = this.state.searchValue.substring(0, i);
        this.setState({
          searchValue: newBoxValue,
          actionDropDownItems: []
        });
        ItemStore.instance.searchText = newBoxValue;
      }
    }

    this.setState({
      keywordDropDownItems: [],
      showDropDown: false
    });

    ItemStore.instance.loadItems();
  };

  private setKeywordDropDownItems = (searchText: string): void => {
    if (!searchText) {
      this.setState({
        keywordSearchValue: "",
        keywordDropDownItems: [],
        showDropDown: false
      });
    } else {
      ItemStore.instance.searchKeywords(searchText).subscribe(
        (keywords: IKeyword[]) => {
          this.setState({
            keywordSearchValue: searchText,
            keywordDropDownItems: (keywords || []).map(k => {
              return {
                item: k,
                label: k.name,
                key: k.name
              };
            }),
            showDropDown: true
          });
        },
        (error: Error) => ErrorBoundary.ensureError(this, error)
      );
    }
  };

  private setActionDropDownItems = (searchText: string): void => {
    const actions: Array<IDropDownItem<IRedirection>> = [];

    if ((searchText && searchText.startsWith("http://")) || searchText.startsWith("https://")) {
      const url = `/items/create/${ItemKind.Url}/${encodeURIComponent(searchText)}`;
      actions.push({
        item: {
          url: url
        },
        key: url,
        label: "Create URL"
      });
    } else if (searchText) {
      const url = `/items/create/${ItemKind.Note}/${encodeURIComponent(searchText)}`;
      actions.push({
        item: {
          url: url
        },
        key: url,
        label: `Create note titled "${searchText}"`
      });
    }

    this.setState({
      actionDropDownItems: actions,
      showDropDown: true
    });
  };
}
