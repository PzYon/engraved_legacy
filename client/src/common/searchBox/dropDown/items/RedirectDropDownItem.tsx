import * as React from "react";
import { Link } from "react-router-dom";
import { IRedirection } from "../../../IRedirection";
import { IDropDownItem } from "../IDropDownItem";

export class RedirectDropDownItem implements IDropDownItem<IRedirection> {
  public get key(): string {
    return this.item.url;
  }

  public get nodeOrLabel(): React.ReactNode {
    return (
      <Link to={this.item.url} key={this.key}>
        {this.item.label}
      </Link>
    );
  }

  public constructor(public item: IRedirection) {}
}
