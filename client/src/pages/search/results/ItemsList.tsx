import { IItem } from "engraved-shared";
import { lighten } from "polished";
import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDidMount } from "../../../common/Hooks";
import { LoadMore } from "../../../common/LoadMore";
import { ItemStore } from "../../../items/ItemStore";
import { Sorting } from "../Sorting";
import { Item } from "./Item";

export const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [noPagesLeft, setNoPagesLeft] = useState(false);

  useDidMount(() => {
    const items$Subscription = ItemStore.instance.items$.subscribe(
      loadedItems => {
        setItems(loadedItems);
        setNoPagesLeft(ItemStore.instance.noPagesLeft);
      }
    );

    ItemStore.instance.loadItems(false);

    return () => items$Subscription.unsubscribe();
  });

  if (!items || items.length === 0) {
    if (!ItemStore.instance.isFirstLoad) {
      if (!ItemStore.instance.userHasNoItems) {
        return (
          <UserMessage>
            No items found. You might want to search for something else.
          </UserMessage>
        );
      }

      return (
        <UserMessage>
          New here? <Link to={"items/create/note"}>Add</Link> your first item.
        </UserMessage>
      );
    }

    return null;
  }

  return (
    <>
      <Sorting
        options={[
          { label: "Edited On", value: "editedOn" },
          { label: "Title", value: "title" }
        ]}
      />
      <ListContainer>
        <List>
          {items.map((item: IItem) => (
            <ListItem key={item._id}>
              <Item item={item} />
            </ListItem>
          ))}
        </List>
      </ListContainer>
      {noPagesLeft ? (
        !ItemStore.instance.isFirstPage && (
          <UserMessage>That's all, you reached the end...</UserMessage>
        )
      ) : (
        <LoadMore loadMore={() => ItemStore.instance.loadItems(true)} />
      )}
    </>
  );
};

const ListContainer = styled.div`
  margin-bottom: ${p => p.theme.bigSpacing};
`;

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;

  display: grid;
  grid-template-columns: repeat(2, 50fr);
  grid-column-gap: ${p => p.theme.bigSpacing};
  grid-row-gap: ${p => p.theme.bigSpacing};

  @media (max-width: 900px) {
    grid-template-columns: repeat(1, 100%);
  }
`;

const ListItem = styled.li``;

const UserMessage = styled.div`
  margin-top: 100px;
  text-align: center;
  font-size: ${p => p.theme.font.size.large};
  color: ${p => lighten(0.3, p.theme.colors.text)};
`;
