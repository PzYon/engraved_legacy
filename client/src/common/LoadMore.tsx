import * as React from "react";
import styled from "styled-components";
import { ButtonStyle, FormButton } from "./form/buttons/FormButton";

const Container = styled.div`
  width: 100%;
  text-align: center;
`;

export interface ILoadMoreProps {
  loadMore: () => void;
}

export const LoadMore: React.FC<ILoadMoreProps> = (props: ILoadMoreProps) => (
  <Container>
    <FormButton
      button={{
        nodeOrLabel: "Load more",
        onClick: props.loadMore,
        buttonStyle: ButtonStyle.Primary
      }}
    />
  </Container>
);
