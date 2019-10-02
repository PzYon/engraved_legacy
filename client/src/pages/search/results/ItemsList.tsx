import { IItem } from "engraved-shared";
import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useDidMount } from "../../../common/Hooks";
import { If } from "../../../common/If";
import { LoadMore } from "../../../common/LoadMore";
import { ItemStore } from "../../../items/ItemStore";
import { Sorting } from "../Sorting";
import { Item } from "./Item";

export const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [noPagesLeft, setNoPagesLeft] = useState(false);

  useDidMount(() => {
    const items$Subscription = ItemStore.instance.items$.subscribe(loadedItems => {
      setItems(loadedItems);
      setNoPagesLeft(ItemStore.instance.noPagesLeft);
    });

    ItemStore.instance.loadItems(false);

    return () => items$Subscription.unsubscribe();
  });

  return (
    <If
      value={items}
      renderElse={() => {
        return (
          !ItemStore.instance.isFirstLoad && (
            <NoItemsFound>
              No items found. You might want to search for something else.
            </NoItemsFound>
          )
        );
      }}
      render={() => (
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
          <If
            value={!noPagesLeft}
            render={() => <LoadMore loadMore={() => ItemStore.instance.loadItems(true)} />}
            renderElse={() => <UserMessage>That's all, you reached the end...</UserMessage>}
          />
        </>
      )}
    />
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
  text-align: center;
  font-size: ${p => p.theme.font.size.large};
  color: ${p => p.theme.colors.palette.shades.dark};
`;

const NoItemsFound = styled(UserMessage)`
  margin-top: 100px;
`;
