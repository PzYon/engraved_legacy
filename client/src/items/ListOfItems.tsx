import {IItem} from "engraved-shared/dist";
import * as React from "react";
import {ReactNode} from "react";
import styled from "styled-components";
import {Item} from "./Item";

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
`;

export interface IListOfItemsProps {
    items: IItem[];
}

export class ListOfItems extends React.PureComponent<IListOfItemsProps> {
    public render(): ReactNode {
        if (!this.props.items || !this.props.items.length) {
            return null;
        }

        return (
            <List>
                {
                    this.props
                        .items
                        .map((t: IItem) => (
                            <ListItem key={t._id}>
                                <Item {...t} />
                            </ListItem>
                        ))
                }
            </List>
        );
    }
}