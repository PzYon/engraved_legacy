import * as React from "react";
import { ReactNode } from "react";
import styled from "styled-components";
import { StyleConstants } from "../../../styling/StyleConstants";
import { StyleUtil } from "../../../styling/StyleUtil";
import { Closer } from "../../Closer";
import { If } from "../../If";
import { IDropDownItem } from "./IDropDownItem";
import { IDropDownItemGroup } from "./IDropDownItemGroup";

const ContainerDiv = styled.div`
  position: absolute;
  width: calc(100% - 2px);
  text-align: left;
  font-size: ${StyleConstants.font.small};
  z-index: 123;
  border-right: 1px solid ${StyleConstants.colors.discreet};
  border-bottom: 1px solid ${StyleConstants.colors.discreet};
  border-left: 1px solid ${StyleConstants.colors.discreet};
  background-color: ${StyleConstants.colors.discreet};
  box-shadow: ${StyleConstants.defaultBoxShadow};

  .ngrvd-closer {
    right: 0.3rem;
    top: 0;
  }
`;

const GroupContainerDiv = styled.div``;

const GroupItemsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const GroupTitleDiv = styled.div`
  font-weight: bold;
  padding: ${StyleConstants.formElementPadding};
`;

const GroupItem = styled.li`
  padding: ${StyleConstants.formElementPadding};

  ${StyleUtil.getEllipsis()} ${StyleUtil.normalizeAnchors(StyleConstants.colors.font)}

  &:hover {
    background-color: ${StyleConstants.colors.accent};
    color: white;
    cursor: pointer;

    a {
      color: white;
    }
  }
`;

export interface ISuggestionsProps {
  groups: IDropDownItemGroup[];
  onClose: () => void;
}

interface ISuggestionsState {
  // active node (using key board)
  // up/down and enter to select
  // --> if none of the above, then transform to SFC
}

export class DropDown extends React.PureComponent<ISuggestionsProps, ISuggestionsState> {
  public constructor(props: ISuggestionsProps) {
    super(props);

    this.state = {};
  }

  public render(): ReactNode {
    const groups: IDropDownItemGroup[] = this.props.groups;

    if (!groups || !groups.length) {
      return null;
    }

    return (
      <ContainerDiv>
        <Closer onClose={this.props.onClose} title={"Close"}>
          x
        </Closer>
        {groups.map((g: IDropDownItemGroup, index: number) => {
          return (
            <GroupContainerDiv key={g.title || index}>
              <If value={g.title} render={() => <GroupTitleDiv>{g.title}</GroupTitleDiv>} />
              <GroupItemsList>
                {g.items.map((i: IDropDownItem) => {
                  return (
                    <GroupItem key={i.key} onClick={() => g.onSelectItem(i)}>
                      {i.nodeOrLabel}
                    </GroupItem>
                  );
                })}
              </GroupItemsList>
            </GroupContainerDiv>
          );
        })}
      </ContainerDiv>
    );
  }
}
