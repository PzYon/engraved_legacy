import { IKeyword, ItemKind } from "engraved-shared";
import * as React from "react";
import { ReactNode } from "react";
import { Redirect } from "react-router";
import { Subscription } from "rxjs";
import styled, { css } from "styled-components";
import { IAction } from "../../actions/IAction";
import { ErrorBoundary } from "../../common/ErrorBoundary";
import { IKeywordDropDownItem } from "../../common/form/fields/keyword/IKeywordDropDownItem";
import { IDropDownItem } from "../../common/searchBox/dropDown/IDropDownItem";
import { IDropDownItemGroup } from "../../common/searchBox/dropDown/IDropDownItemGroup";
import { SearchBox } from "../../common/searchBox/SearchBox";
import { ItemStore } from "../../items/ItemStore";

interface IWrapperDivStyle {
  showDropDown: boolean;
}

const WrapperDiv = styled.div<IWrapperDivStyle>`
  .search-box-inner {
    border-radius: ${p => p.theme.borderRadius};
    border: 1px solid ${p => p.theme.colors.border};

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
  keywordDropDownItems: Array<IDropDownItem<IKeywordDropDownItem>>;
  actionDropDownItems: Array<IDropDownItem<IAction>>;
  selectedKeywords: IKeyword[];
  redirectToUrl: string;
}

export class GlobalSearchBox extends React.PureComponent<{}, IGlobalSearchBoxState> {
  public readonly state: IGlobalSearchBoxState = {
    searchValue: ItemStore.instance.searchText,
    keywordSearchValue: "",
    showDropDown: true,
    actionDropDownItems: [],
    keywordDropDownItems: [],
    selectedKeywords: [],
    redirectToUrl: null
  };
  private findOnTypeTimer: any;
  private keywords$Subscription: Subscription;

  public componentDidMount(): void {
    this.keywords$Subscription = ItemStore.instance.keywords$.subscribe(keywords =>
      this.setState({ selectedKeywords: keywords })
    );
  }

  public componentWillUnmount(): void {
    if (this.keywords$Subscription) {
      this.keywords$Subscription.unsubscribe();
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
          giveFocusOnLoad={true}
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
        onSelectItem: (item: IDropDownItem<IAction>) => {
          if (item.item.url) {
            this.setState({
              redirectToUrl: item.item.url
            });
          } else if (item.item.onClick) {
            item.item.onClick();
          }
        }
      });
    }

    if (this.state.keywordDropDownItems.length) {
      dropDownGroups.push({
        title: "Keywords",
        items: this.state.keywordDropDownItems,
        onSelectItem: (item: IDropDownItem<IKeywordDropDownItem>) => {
          this.handleKeywordSelect(item.item.keyword);
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
    if (ItemStore.isInvalidSearchText(searchText)) {
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
                item: { label: k.name, keyword: k },
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
    const actions: Array<IDropDownItem<IAction>> = [];

    if (!ItemStore.isInvalidSearchText(searchText)) {
      if (searchText.startsWith("http://") || searchText.startsWith("https://")) {
        const url = `/items/create/${ItemKind.Url}/${encodeURIComponent(searchText)}`;
        actions.push({
          item: {
            url: url,
            label: "Create URL"
          },
          key: url
        });
      } else if (searchText) {
        const url = `/items/create/${ItemKind.Note}/${encodeURIComponent(searchText)}`;
        actions.push({
          item: {
            url: url,
            label: `Create note titled "${searchText}"`
          },
          key: url
        });
        actions.push({
          item: {
            onClick: () => {
              ItemStore.instance.searchText = "";
              ItemStore.instance.loadItems();
              this.setState({ searchValue: "" }, () => this.setActionDropDownItems(""));
            },
            label: `Clear search text`
          },
          key: "clear_search_text"
        });
      }

      if (this.state.selectedKeywords.length > 0) {
        actions.push({
          item: {
            onClick: () => {
              ItemStore.instance.keywords$.next([]);
              ItemStore.instance.loadItems();
              this.setActionDropDownItems("");
            },
            label: `Clear keywords`
          },
          key: "clear_keywords"
        });
      }
    }

    this.setState({
      actionDropDownItems: actions,
      showDropDown: true
    });
  };
}
