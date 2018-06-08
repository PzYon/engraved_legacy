import {IKeyword, ItemKind, Util} from "engraved-shared/dist";
import * as React from "react";
import {ChangeEvent, ReactNode} from "react";
import styled from "styled-components";
import {IRedirection} from "../common/IRedirection";
import {StyleConstants} from "../common/StyleConstants";
import {ItemStore} from "../items/ItemStore";
import {DropDown} from "./dropDown/DropDown";
import {IDropDownItem} from "./dropDown/IDropDownItem";
import {IDropDownItemGroup} from "./dropDown/IDropDownItemGroup";
import {KeywordDropDownItem} from "./dropDown/items/KeywordDropDownItem";
import {RedirectDropDownItem} from "./dropDown/items/RedirectDropDownItem";
import {SelectedKeywords} from "./SelectedKeywords";

const ContainerDiv = styled.div`
  display: inline-block;
  position: relative;
  padding: ${StyleConstants.defaultPadding};
`;

const Input = styled.input`
  font-size: ${StyleConstants.largeFontSize};
  border: 0;
  padding: ${StyleConstants.formElementPadding};
  
  &:focus {
    outline: none;
  }
`;

interface IMagicBoxState {
    searchValue: string;
    keywordSearchValue: string
    showDropDown: boolean;
    keywordDropDownItems: Array<IDropDownItem<IKeyword>>;
    actionDropDownItems: RedirectDropDownItem[];
}

export class SearchBox extends React.PureComponent<{}, IMagicBoxState> {
    private node: HTMLDivElement;

    public constructor(props: {}) {
        super(props);

        this.state = {
            searchValue: "",
            keywordSearchValue: "",
            showDropDown: true,
            actionDropDownItems: [],
            keywordDropDownItems: []
        }
    }

    public componentDidMount(): void {
        document.addEventListener("mousedown", (e) => this.handleDocumentClick(e), false);
    }

    public componentWillUnmount(): void {
        document.removeEventListener("mousedown", (e) => this.handleDocumentClick(e), false);
    }

    public render(): ReactNode {
        return (
            <ContainerDiv innerRef={ref => this.node = ref}>
                <SelectedKeywords
                    selectedKeywords={ItemStore.instance.keywords}
                    onKeywordSelect={this.handleKeywordSelect}
                />
                <Input
                    type="text"
                    value={this.state.searchValue}
                    onChange={this.onChange}
                    onFocus={() => this.setState({showDropDown: true})}
                />
                {
                    this.state.showDropDown
                    && (
                        <DropDown
                            groups={this.getDropDownItemGroups()}
                        />
                    )
                }
            </ContainerDiv>
        );
    }

    private handleDocumentClick = (e: any): void => {
        if (this.node && this.node.contains(e.target)) {
            return;
        }

        this.setState({showDropDown: false});
    };

    private onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value: string = e.target.value;

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
                     });
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
