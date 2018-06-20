import * as React from "react";
import {ReactNode} from "react";
import styled from "styled-components";
import {StyleConstants} from "../../styling/StyleConstants";
import {StyleUtil} from "../../styling/StyleUtil";
import {IDropDownItem} from "./IDropDownItem";
import {IDropDownItemGroup} from "./IDropDownItemGroup";

const ContainerDiv = styled.div`
  position: absolute;
  width: 100%;
  text-align: left;
  font-size: 0.8rem;
  border-top: 1px solid ${StyleConstants.colors.accent.light};
  background-color: ${StyleConstants.colors.pageBackground};
`;

const GroupContainerDiv = styled.div`
`;

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

  ${StyleUtil.getEllipsis()}

  &:hover {
    background-color: ${StyleConstants.colors.accent.light};
    cursor: pointer;
  }
`;

export interface ISuggestionsProps {
    groups: IDropDownItemGroup[];
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
                {
                    groups.map((g: IDropDownItemGroup, index: number) => {
                        return (
                            <GroupContainerDiv key={g.title || index}>
                                {
                                    g.title
                                    && (
                                        <GroupTitleDiv>
                                            {g.title}
                                        </GroupTitleDiv>
                                    )
                                }
                                <GroupItemsList>
                                    {
                                        g.items.map((i: IDropDownItem) => {
                                            return (
                                                <GroupItem
                                                    key={i.key}
                                                    onClick={() => g.onSelectItem(i)}
                                                >
                                                    {i.nodeOrLabel}
                                                </GroupItem>
                                            );
                                        })
                                    }
                                </GroupItemsList>
                            </GroupContainerDiv>
                        )
                    })
                }
            </ContainerDiv>
        );
    }
}
