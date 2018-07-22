import { INoteItem } from "engraved-shared";
import * as React from "react";
import { Markdown } from "../../common/form/fields/Markdown";
import { IViewItemProps } from "./IViewItemProps";

export const ViewNoteItem: React.SFC<IViewItemProps<INoteItem>> = (
  props: IViewItemProps<INoteItem>
) => {
  return <Markdown markdown={props.item.note} />;
};
