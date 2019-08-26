import { IItem } from "engraved-shared";
import * as React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { If } from "../../../common/If";
import { LoadMore } from "../../../common/LoadMore";
import { ItemStore } from "../../../items/ItemStore";
import { Sorting } from "../Sorting";
import { Item } from "./Item";

export const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [noPagesLeft, setNoPagesLeft] = useState(false);

  useEffect(() => {
    const items$Subscription = ItemStore.instance.items$.subscribe(loadedItems => {
      setItems(loadedItems);
      setNoPagesLeft(ItemStore.instance.noPagesLeft);
    });

    ItemStore.instance.loadItems(false);

    return () => items$Subscription.unsubscribe();
  }, []);

  return (
    <If
      value={items}
      render={() => (
        <>
          <Sorting
            options={[
              { label: "Edited On", value: "editedOn" },
              { label: "Title", value: "title" }
            ]}
          />
          <List>
            {items.map((item: IItem) => (
              <ListItem key={item._id}>
                <Item item={item} />
              </ListItem>
            ))}
          </List>
          <If
            value={!noPagesLeft}
            render={() => <LoadMore loadMore={() => ItemStore.instance.loadItems(true)} />}
          />
        </>
      )}
    />
  );
};

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li``;
