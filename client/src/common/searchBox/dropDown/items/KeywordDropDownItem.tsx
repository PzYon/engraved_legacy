import { IKeyword } from "engraved-shared";
import * as React from "react";
import { IDropDownItem } from "../IDropDownItem";

export class KeywordDropDownItem implements IDropDownItem<IKeyword> {
  public get key(): string {
    return this.item.name;
  }

  public get nodeOrLabel(): React.ReactNode {
    return this.item.name;
  }

  public constructor(public item: IKeyword) {}
}
