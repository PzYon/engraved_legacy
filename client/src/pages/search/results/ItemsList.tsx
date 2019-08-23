import { IItem } from "engraved-shared";
import * as React from "react";
import { ReactNode } from "react";
import { Subscription } from "rxjs";
import styled from "styled-components";
import { ErrorBoundary } from "../../../common/ErrorBoundary";
import { If } from "../../../common/If";
import { LoadMore } from "../../../common/LoadMore";
import { ItemStore } from "../../../items/ItemStore";
import { Item } from "./Item";

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li``;

interface IListOfItemsState {
  items: IItem[];
  noPagesLeft: boolean;
}

export class ItemsList extends React.PureComponent<{}, IListOfItemsState> {
  private items$Subscription: Subscription;

  public readonly state: IListOfItemsState = {
    items: [],
    noPagesLeft: false
  };

  public componentDidMount(): void {
    this.items$Subscription = ItemStore.instance.items$.subscribe(
      items => this.setState({ items: items, noPagesLeft: ItemStore.instance.noPagesLeft }),
      (error: Error) => ErrorBoundary.ensureError(this, error)
    );

    ItemsList.loadItems();
  }

  public componentWillUnmount(): void {
    if (this.items$Subscription) {
      this.items$Subscription.unsubscribe();
    }
  }

  public render(): ReactNode {
    return (
      <If
        value={this.state.items}
        render={() => (
          <>
            <List>
              {this.state.items.map((item: IItem) => (
                <ListItem key={item._id}>
                  <Item item={item} />
                </ListItem>
              ))}
            </List>
            <If
              value={!this.state.noPagesLeft}
              render={() => <LoadMore loadMore={() => ItemsList.loadItems(true)} />}
            />
          </>
        )}
      />
    );
  }

  private static loadItems(isPaging?: boolean) {
    ItemStore.instance.loadItems(isPaging);
  }
}
