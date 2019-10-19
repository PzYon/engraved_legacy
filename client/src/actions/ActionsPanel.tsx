import * as React from "react";
import { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { DropDown } from "../common/searchBox/dropDown/DropDown";
import { IDropDownItem } from "../common/searchBox/dropDown/IDropDownItem";
import { ActionsContext } from "./ActionsContext";
import { IAction } from "./IAction";

export const ActionsPanel = (props: { closePanel: () => void }) => {
  const actionsContext = useContext(ActionsContext);
  const [redirectUrl, setRedirectUrl] = useState();

  console.log("rendering Actions Panel with " + actionsContext.actions.length + " actions");

  if (redirectUrl) {
    props.closePanel();
    return <Redirect to={redirectUrl} />;
  }

  return (
    <Panel>
      <DropDown
        groups={[
          {
            title: "Quick Actions",
            onSelectItem: (item: IDropDownItem<IAction>) => {
              if (item.item.url) {
                setRedirectUrl(item.item.url);
              } else if (item.item.onClick) {
                item.item.onClick();
                // props.closePanel();
              }
            },
            items: actionsContext.actions.map(a => ({
              key: a.label,
              label: a.label,
              item: a
            }))
          }
        ]}
        onClose={props.closePanel}
        isFloating={true}
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
