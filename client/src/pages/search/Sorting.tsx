import { SortDirection } from "engraved-shared";
import { ChangeEvent } from "react";
import * as React from "react";
import styled from "styled-components";
import { ISelectFieldOptions } from "../../common/form/fields/select/SelectField";
import { SelectInner } from "../../common/form/fields/select/SelectInner";
import { ITogglerValue, Toggler } from "../../common/Toggler";
import { ItemStore } from "../../items/ItemStore";
import { StyleConstants } from "../../styling/StyleConstants";

export interface ISortingProps<T> {
  options: Array<ISelectFieldOptions<T>>;
}

export const Sorting = (props: ISortingProps<any>) => (
  <Root>
    Order by{" "}
    <SelectContainer>
      <SelectInner
        options={props.options}
        onValueChange={(event: ChangeEvent<HTMLSelectElement>): void => {
          const option: ISelectFieldOptions<any> = props.options.find(
            o => o.value === event.target.value
          ) as any;

          ItemStore.instance.sorting.propName = option.value;
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
  font-size: ${StyleConstants.font.size.small};
  text-align: right;

  .ngrvd-closer,
  select {
    font-size: ${StyleConstants.font.size.small};
  }

  .ngrvd-closer {
    right: 0;
  }
`;

const SelectContainer = styled.span`
  margin: 0 12px;
`;

const TogglerContainer = styled.span``;
