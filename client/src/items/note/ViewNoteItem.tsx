import { INoteItem } from "engraved-shared";
import * as React from "react";
import { Markdown } from "../../common/form/fields/markdown/Markdown";
import { IViewItemProps } from "../IViewItemProps";

export const ViewNoteItem: React.FC<IViewItemProps<INoteItem>> = (
  props: IViewItemProps<INoteItem>
) => {
  return <Markdown markdown={props.item.note} />;
};
