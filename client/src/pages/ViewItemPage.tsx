import * as React from "react";
import { useState } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import styled from "styled-components";
import { Edited } from "../common/Edited";
import { ButtonStyle, FormButton } from "../common/form/buttons/FormButton";
import {
  FormButtonContainer,
  FormContainer,
  FormFieldContainer
} from "../common/form/Form.StyledComponents";
import { useDidMount } from "../common/Hooks";
import { If } from "../common/If";
import { ItemKindIcon } from "../common/ItemKindIcon";
import { Keywords } from "../common/Keywords";
import { ItemKindRegistrationManager } from "../items/ItemKindRegistrationManager";
import { ItemStore } from "../items/ItemStore";
import { Page } from "./Page";

export const ViewItemPage = (
  props: RouteComponentProps<{
    itemId: string;
  }>
) => {
  const [itemId, setItemId] = useState(decodeURIComponent(props.match.params.itemId));
  const [item, setItem] = useState();
  const [failedToLoad, setFailedToLoad] = useState(false);
  const [isClose, setIsClose] = useState(false);

  useDidMount(() => {
    const sub = ItemStore.instance
      .getLocalItemOrLoad(itemId)
      .subscribe(setItem, () => setFailedToLoad(true));

    return () => sub.unsubscribe();
  });

  if (isClose) {
    return <Redirect to="/" push={true} />;
  }

  if (failedToLoad) {
    // todo: we could consider extending the NotFoundPage with
    // to be able to read some stuff from the URL an react accordingly
    return <Redirect to="/item-not-found" />;
  }

  if (!item) {
    return null;
  }

  return (
    <Page browserTitle={item.title} title={item.title}>
      <FormContainer>
        <article>
          <FormFieldContainer>
            <ItemPropertiesContainer>
              <ItemPropertyDiv>
                <ItemKindIcon itemKind={item.itemKind} />
              </ItemPropertyDiv>
              <ItemPropertyDiv>
                <Edited {...item} />
              </ItemPropertyDiv>
              <If
                value={item.keywords}
                render={() => (
                  <ItemPropertyDiv>
                    <Keywords onClick={null} keywords={item.keywords} />
                  </ItemPropertyDiv>
                )}
              />
            </ItemPropertiesContainer>
            <If
              value={item.description}
              render={() => <SectionContainer>{item.description}</SectionContainer>}
            />
            <SectionContainer>
              {ItemKindRegistrationManager.resolve(item.itemKind).getViewFormFields(item)}
            </SectionContainer>
          </FormFieldContainer>
        </article>
      </FormContainer>
      <FormButtonContainer>
        <FormButton
          key={"Edit"}
          button={{
            onClick: void 0,
            url: `/items/${item._id}/edit`,
            label: "Edit",
            buttonStyle: ButtonStyle.Primary,
            useAsContextualAction: true
          }}
        />
        <FormButton
          key={"Close"}
          button={{
            onClick: () => setIsClose(true),
            label: "Close",
            buttonStyle: ButtonStyle.Secondary,
            useAsContextualAction: true
          }}
        />
      </FormButtonContainer>
    </Page>
  );
};

const SectionContainer = styled.div`
  margin: 1rem 0;
`;

const ItemPropertiesContainer = styled(SectionContainer)`
  display: flex;
  align-items: stretch;
  font-size: ${p => p.theme.font.size.small};
`;

const ItemPropertyDiv = styled.div`
  padding: 0.2rem 0.4rem;
  border-left: 1px solid ${p => p.theme.colors.border};
  border-top: 1px solid ${p => p.theme.colors.border};
  border-bottom: 1px solid ${p => p.theme.colors.border};

  display: flex;
  align-items: center;

  &:last-of-type {
    border-right: 1px solid ${p => p.theme.colors.border};
  }
`;
