import * as React from "react";
import { useState } from "react";
import styled, { css } from "styled-components";
import { ThemeStyle } from "../styling/ThemeStyle";
import { Pill } from "./Pill";

export interface ITogglerValue {
  key: string;
  label: string;
  tooltip: string;
}

export interface ITogglerProps {
  values: ITogglerValue[];
  defaultValue: ITogglerValue;
  onValueChange: (value: ITogglerValue) => void;
}

export const Toggler = (props: ITogglerProps) => {
  const [activeItem, setActiveItem] = useState(props.defaultValue);

  return (
    <Root>
      {props.values.map(v => (
        <Pill
          className={"ngrvd-sort-toggler"}
          key={v.key}
          label={v.label}
          tooltip={v.tooltip}
          onClick={() => {
            setActiveItem(v);
            props.onValueChange(v);
          }}
          isSecondary={v !== activeItem}
        />
      ))}
    </Root>
  );
};

const Root = styled.span`
  .ngrvd-sort-toggler {
    padding-top: 2px;
    padding-bottom: 2px;

    ${p =>
      p.theme.themeStyle === ThemeStyle.Dark
        ? css`
            border: 1px solid ${p.theme.colors.border};
          `
        : null}
  }
`;
