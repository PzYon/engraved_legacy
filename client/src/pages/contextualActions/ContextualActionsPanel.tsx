import * as React from "react";
import { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { IAction } from "../../common/IAction";
import { DropDown } from "../../common/searchBox/dropDown/DropDown";
import { IDropDownItem } from "../../common/searchBox/dropDown/IDropDownItem";
import { ContextualActionsContext } from "./ContextualActionsContext";

export const ContextualActionsPanel = (props: { closePanel: () => void }) => {
  const contextualActionsContext = useContext(ContextualActionsContext);
  const [redirectUrl, setRedirectUrl] = useState();

  if (redirectUrl) {
    return <Redirect to={redirectUrl} />;
  }

  return (
    <Panel>
      <DropDown
        groups={[
          {
            title: "Quick@ctions",
            onSelectItem: (item: IDropDownItem<IAction>) => {
              if (item.item.url) {
                setRedirectUrl(item.item.url);
              } else if (item.item.onClick) {
                item.item.onClick();
              }
              props.closePanel();
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
