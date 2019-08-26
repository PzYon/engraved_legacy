import { IKeyword } from "engraved-shared";
import * as React from "react";
import { Pill } from "./Pill";

export interface IKeywordProps {
  keyword: IKeyword;
  onClick?: (keyword: IKeyword) => void;
}

export const Keyword: React.FC<IKeywordProps> = (props: IKeywordProps) => (
  <Pill
    className={"ngrvd-keyword"}
    onClick={() => (props.onClick ? props.onClick(props.keyword) : void 0)}
    label={props.keyword.name}
  />
);
