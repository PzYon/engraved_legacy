import {IKeyword, ItemKind, Util} from "engraved-shared/dist";
import * as React from "react";
import {ReactNode} from "react";
import {ErrorBoundary} from "../../common/ErrorBoundary";
import {IRedirection} from "../../common/IRedirection";
import {ItemStore} from "../../common/items/ItemStore";
import {IDropDownItem} from "../../common/searchBox/dropDown/IDropDownItem";
import {IDropDownItemGroup} from "../../common/searchBox/dropDown/IDropDownItemGroup";
import {KeywordDropDownItem} from "../../common/searchBox/dropDown/items/KeywordDropDownItem";
import {RedirectDropDownItem} from "../../common/searchBox/dropDown/items/RedirectDropDownItem";
import {SearchBox} from "../../common/searchBox/SearchBox";

interface IGlobalSearchBoxState {
    searchValue: string;
    keywordSearchValue: string
    showDropDown: boolean;
    keywordDropDownItems: Array<IDropDownItem<IKeyword>>;
    actionDropDownItems: RedirectDropDownItem[];
}

export class GlobalSearchBox extends React.PureComponent<{}, IGlobalSearchBoxState> {

    public constructor(props: {}) {
        super(props);

        this.state = {
            searchValue: "",
            keywordSearchValue: "",
            showDropDown: true,
            actionDropDownItems: [],
            keywordDropDownItems: []
        };
    }

    public render(): ReactNode {
        return (
            <SearchBox
                selectedKeywords={ItemStore.instance.keywords}
                onKeywordSelect={this.handleKeywordSelect}
                dropDownItemGroups={this.getDropDownItemGroups()}
                onChange={this.onChange}
                searchValue={this.state.searchValue}
            />
        );
    }

    private onChange = (value: string): void => {
        this.setState({searchValue: value});

        ItemStore.instance.searchText = value;
        ItemStore.instance.loadItems();

        this.setKeywordDropDownItems(value);
        this.setActionDropDownItems(value);
    };

    private getDropDownItemGroups = (): IDropDownItemGroup[] => {
        const suggestionGroups: IDropDownItemGroup[] = [];

        if (this.state.actionDropDownItems.length) {
            suggestionGroups.push({
                                      title: "Actions",
                                      items: this.state.actionDropDownItems,
                                      onSelectItem: () => this.setState({showDropDown: false})
                                  });
        }

        if (this.state.keywordDropDownItems.length) {
            suggestionGroups.push({
                                      title: "Keywords",
                                      items: this.state.keywordDropDownItems,
                                      onSelectItem: (item: IDropDownItem<IKeyword>) => {
                                          this.handleKeywordSelect(item.item);
                                      }
                                  });
        }

        return suggestionGroups;
    };

    private handleKeywordSelect = (keyword: IKeyword) => {
        const isNew: boolean = Util.toggleArrayValue(ItemStore.instance.keywords, keyword);

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
            ItemStore.instance
                     .searchKeywords(searchText)
                     .subscribe((keywords: IKeyword[]) => {
                         this.setState({
                                           keywordSearchValue: searchText,
                                           keywordDropDownItems: (keywords || []).map(k => new KeywordDropDownItem(k)),
                                           showDropDown: true
                                       });
                     }, (error: Error) => ErrorBoundary.ensureError(this, error));
        }
    };

    private setActionDropDownItems = (searchText: string): void => {
        const actions: Array<IDropDownItem<IRedirection>> = [];

        if (searchText && searchText.startsWith("http://") || searchText.startsWith("https://")) {
            actions.push(new RedirectDropDownItem({
                                                      url: `/create/${ItemKind.Url}/${encodeURIComponent(searchText)}`,
                                                      label: "Create URL"
                                                  }));
        } else if (searchText) {
            actions.push(new RedirectDropDownItem({
                                                      url: `/create/${ItemKind.Note}/${encodeURIComponent(searchText)}`,
                                                      label: `Create note titled "${searchText}"`
                                                  }));
        }

        this.setState({
                          actionDropDownItems: actions,
                          showDropDown: true
                      });
    };
}
