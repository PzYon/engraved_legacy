import {IItem} from "engraved-shared/dist";
import * as React from "react";
import {ReactNode} from "react";
import styled from "styled-components";
import {ErrorBoundary} from "../common/ErrorBoundary";
import {Item} from "./Item";
import {ItemStore} from "./ItemStore";

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
`;

interface IListOfItemsState {
    items: IItem[];
}

export class ItemsList extends React.PureComponent<{}, IListOfItemsState> {
    public constructor(props: {}) {
        super(props);

        this.state = {items: []};
    }

    public componentDidMount() {
        ItemStore.instance
                 .items$
                 .subscribe(t => this.setState({items: t}),
                            (error: Error) => ErrorBoundary.ensureError(this, error));
    }

    public render(): ReactNode {
        const items: IItem[] = this.state.items;
        if (!items || !items.length) {
            return null;
        }

        return (
            <List>
                {
                    items.map((t: IItem) => (
                        <ListItem key={t._id}>
                            <Item {...t} />
                        </ListItem>
                    ))
                }
            </List>
        );
    }
}