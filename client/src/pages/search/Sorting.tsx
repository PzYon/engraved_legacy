import { SortDirection } from "engraved-shared";
import * as React from "react";
import styled from "styled-components";
import { ISelectFieldOptions } from "../../common/form/fields/select/SelectField";
import { SelectInner } from "../../common/form/fields/select/SelectInner";
import { ITogglerValue, Toggler } from "../../common/Toggler";
import { ItemStore } from "../../items/ItemStore";

export interface ISortingProps<T> {
  options: Array<ISelectFieldOptions<T>>;
}

export const Sorting = (props: ISortingProps<any>) => (
  <Root>
    Order by{" "}
    <SelectContainer>
      <SelectInner
        options={props.options}
        onValueChange={(value: string): void => {
          ItemStore.instance.sorting.propName = value;
          ItemStore.instance.loadItems();
        }}
        defaultKey={"value"}
      />
    </SelectContainer>
    <TogglerContainer>
      <Toggler
        onValueChange={(value: ITogglerValue) => {
          ItemStore.instance.sorting.direction = value.key as SortDirection;
          ItemStore.instance.loadItems();
        }}
        values={sortTogglerValues}
        defaultValue={sortTogglerValues[1]}
      />
    </TogglerContainer>
  </Root>
);

const sortTogglerValues: ITogglerValue[] = [
  {
    label: "a-z",
    key: SortDirection.Ascending,
    tooltip: "Ascending"
  },
  {
    label: "z-a",
    key: SortDirection.Descending,
    tooltip: "Descending"
  }
];

const Root = styled.div`
  margin: 1.5rem 0;
  font-size: ${p => p.theme.font.size.small};
  text-align: right;

  select {
    font-size: ${p => p.theme.font.size.small};
  }
`;

const SelectContainer = styled.span`
  margin: 0 12px;
`;

const TogglerContainer = styled.span``;
