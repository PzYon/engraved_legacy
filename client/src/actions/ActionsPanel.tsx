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

  if (redirectUrl) {
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
              }
            },
            items: actionsContext.actions
              .sort((a: IAction, b: IAction) => {
                const labelA = a.label.toUpperCase();
                const labelB = b.label.toUpperCase();
                return labelA < labelB ? -1 : labelA > labelB ? 1 : 0;
              })
              .map(a => ({
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
  position: fixed;
  right: ${p => p.theme.defaultSpacing};
  top: 40vh;
  width: 300px;
  z-index: 10;
`;
