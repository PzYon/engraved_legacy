import {IItem, IKeyword, ItemKind, Util} from "engraved-shared/dist";
import * as React from "react";
import {ReactNode} from "react";
import {Route} from "react-router";
import styled from "styled-components";
import {IRedirection} from "./common/IRedirection";
import {AddItemForm} from "./form/AddItemForm";
import {ItemStore} from "./items/ItemStore";
import {ListOfItems} from "./items/ListOfItems";
import {IDropDownItem} from "./magicBox/dropDown/IDropDownItem";
import {IDropDownItemGroup} from "./magicBox/dropDown/IDropDownItemGroup";
import {KeywordDropDownItem} from "./magicBox/dropDown/items/KeywordDropDownItem";
import {RedirectDropDownItem} from "./magicBox/dropDown/items/RedirectDropDownItem";
import {MagicBox} from "./magicBox/MagicBox";

const BoxContainerDiv = styled.div`
  text-align: center;
`;

interface IHomeState {
    boxValue: string;
    items: IItem[];
    keywordDropDownItems: Array<IDropDownItem<IKeyword>>;
    actionDropDownItems: RedirectDropDownItem[];
    boxSuggestionsSearchValue: string;
}

export class Home extends React.Component<{}, IHomeState> {
    public constructor(props: {}) {
        super(props);

        this.state = {
            boxValue: "",
            items: [],
            keywordDropDownItems: [],
            actionDropDownItems: [],
            boxSuggestionsSearchValue: "",
        };
    }

    public componentDidMount() {
        ItemStore.instance.items$.subscribe(t => this.setState({items: t}));
    }

    public render(): ReactNode {

        // onKeyWordSelect is only used for toggling.. not good!

        return (
            <div>
                <BoxContainerDiv>
                    <MagicBox
                        value={this.state.boxValue}
                        onValueChange={this.handleBoxValueChange}
                        dropDownItemGroups={this.getDropDownItemGroups()}
                        onKeywordSelect={this.handleKeywordSelect}
                        selectedKeywords={ItemStore.instance.keywords}
                    />
                </BoxContainerDiv>
                <ListOfItems items={this.state.items}/>
                <Route path="/add/:itemKind?/:value?" component={AddItemForm}/>
            </div>
        );
    }

    private getDropDownItemGroups = (): IDropDownItemGroup[] => {
        const suggestionGroups: IDropDownItemGroup[] = [];

        if (this.state.actionDropDownItems.length) {
            suggestionGroups.push({
                                      title: "Actions",
                                      items: this.state.actionDropDownItems,
                                      onSelectItem: () => void(0)
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

    private handleBoxValueChange = (value: string) => {
        this.setState({boxValue: value});

        ItemStore.instance.searchText = value;
        ItemStore.instance.loadItems();

        this.setKeywordDropDownItems(value);
        this.setActionDropDownItems(value);
    };

    private handleKeywordSelect = (keyword: IKeyword) => {
        const isNew: boolean = Util.toggleArrayValue(ItemStore.instance.keywords, keyword);

        if (isNew) {
            const i = this.state.boxValue.lastIndexOf(this.state.boxSuggestionsSearchValue);
            if (i > -1) {
                const newBoxValue = this.state.boxValue.substring(0, i);
                this.setState({boxValue: newBoxValue});
                ItemStore.instance.searchText = newBoxValue;
            }
        }

        this.setState({keywordDropDownItems: []});

        ItemStore.instance.loadItems();
    };

    private setKeywordDropDownItems = (searchText: string): void => {
        if (!searchText) {
            this.setState({
                              boxSuggestionsSearchValue: "",
                              keywordDropDownItems: []
                          });
        } else {
            ItemStore.instance
                     .searchKeywords(searchText)
                     .subscribe((keywords: IKeyword[]) => {
                         this.setState({
                                           boxSuggestionsSearchValue: searchText,
                                           keywordDropDownItems: (keywords || []).map(k => new KeywordDropDownItem(k))
                                       });
                     });
        }
    };

    private setActionDropDownItems = (searchText: string): void => {
        const actions: Array<IDropDownItem<IRedirection>> = [];

        if (searchText && searchText.startsWith("http://") || searchText.startsWith("https://")) {
            actions.push(new RedirectDropDownItem({
                                                      url: `/add/${ItemKind.Url}/${encodeURIComponent(searchText)}`,
                                                      label: "Create URL"
                                                  }));
        } else if (searchText) {
            actions.push(new RedirectDropDownItem({
                                                      url: `/add/${ItemKind.Note}/${encodeURIComponent(searchText)}`,
                                                      label: `Create note titled "${searchText}"`
                                                  }));
        }

        this.setState({actionDropDownItems: actions});
    };
}