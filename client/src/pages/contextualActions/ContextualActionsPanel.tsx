import * as React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { DropDown } from "../../common/searchBox/dropDown/DropDown";
import { IDropDownItem } from "../../common/searchBox/dropDown/IDropDownItem";
import { ContextualActionsContext, IContextualAction } from "./ContextualActionsContext";

export const ContextualActionsPanel = (props: { closePanel: () => void }) => {
  const contextualActionsContext = useContext(ContextualActionsContext);

  return (
    <Panel>
      <DropDown
        groups={[
          {
            title: "Quick@ctions",
            onSelectItem: (item: IDropDownItem<IContextualAction>) => {
              if (item && item.item.onClick) {
                item.item.onClick();
              } else {
                alert("Not implemented yet.");
              }
            },
            items: contextualActionsContext.actions.map(a => ({
              key: a.label,
              label: a.label,
              item: a
            }))
          }
        ]}
        onClose={props.closePanel}
      />
    </Panel>
  );
};

const Panel = styled.div`
  width: 300px;
  position: absolute;
  right: 50px;
  top: 0;
`;
