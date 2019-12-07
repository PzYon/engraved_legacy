import * as React from "react";
import { ReactNode } from "react";
import { fromEvent, Subscription } from "rxjs";
import styled, { css } from "styled-components";
import { ILabeled } from "../../../actions/IAction";
import { ITheme } from "../../../styling/ITheme";
import { StyleUtil } from "../../../styling/StyleUtil";
import { Closer } from "../../Closer";
import { DomUtil } from "../../DomUtil";
import { IDropDownItem } from "./IDropDownItem";
import { IDropDownItemGroup } from "./IDropDownItemGroup";

const ContainerDiv = styled.div<{ isFloating: boolean }>`
  position: absolute;
  width: calc(100% - 2px);
  text-align: left;
  font-size: ${p => p.theme.font.size.small};
  z-index: 123;
  border-right: 1px solid ${p => p.theme.colors.border};
  border-bottom: 1px solid ${p => p.theme.colors.border};
  border-left: 1px solid ${p => p.theme.colors.border};

  ${p =>
    p.isFloating
      ? css`
          border-top: 1px solid ${p.theme.colors.border};
        `
      : null}
  
  background-color: ${p => p.theme.colors.formElementBackground};
  box-shadow: ${p => p.theme.defaultBoxShadow};

  .ngrvd-closer {
    font-size: ${p => p.theme.font.size.large};
    right: 0.4rem;
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
  font-weight: ${p => p.theme.font.weight.normal};
  font-size: ${p => p.theme.font.size.regular};
  padding: ${p => p.theme.formElementPadding};
`;

const GroupItem = styled.li<{
  isActive: boolean;
  theme?: ITheme;
}>`
  padding: ${p => p.theme.formElementPadding};

  ${StyleUtil.getEllipsis()}
  ${p => StyleUtil.normalizeAnchors(p.theme.colors.text)}

  ${p =>
    p.isActive
      ? css`
          background-color: ${p.theme.colors.accent};
          color: ${p.theme.colors.accentContrast};
          cursor: pointer;
        `
      : null}
  }
`;

enum ArrowDirection {
  Up,
  Down
}

export interface IDropDownProps {
  groups: IDropDownItemGroup[];
  onClose: () => void;
  isFloating?: boolean;
}

interface IDropDownState {
  activeItem: IDropDownItem<ILabeled>;
  activeGroup: IDropDownItemGroup;
}

export class DropDown extends React.PureComponent<
  IDropDownProps,
  IDropDownState
> {
  public readonly state: IDropDownState = {
    activeItem: null,
    activeGroup: null
  };

  private keyUpSubscription: Subscription;

  public componentDidMount(): void {
    this.keyUpSubscription = fromEvent<KeyboardEvent>(
      document,
      "keyup"
    ).subscribe((keyboardEvent: KeyboardEvent) => {
      if (!this.props.groups || !this.props.groups.length) {
        return;
      }

      switch (keyboardEvent.key) {
        case "ArrowUp":
          this.setState(this.getNextState(ArrowDirection.Up));
          break;

        case "ArrowDown":
          this.setState(this.getNextState(ArrowDirection.Down));
          break;

        case "Enter":
          if (this.state.activeGroup && this.state.activeItem) {
            this.state.activeGroup.onSelectItem(this.state.activeItem);
          }
          break;

        case "Escape":
          this.props.onClose();
          break;
      }
    });
  }

  public componentWillUnmount() {
    if (this.keyUpSubscription) {
      this.keyUpSubscription.unsubscribe();
    }
  }

  public render(): ReactNode {
    const groups: IDropDownItemGroup[] = this.props.groups;

    if (!groups || !groups.length) {
      return null;
    }

    return (
      <ContainerDiv isFloating={this.props.isFloating}>
        <Closer onClose={this.props.onClose} title={"Close"} />
        {groups.map((group: IDropDownItemGroup, index: number) => (
          <GroupContainerDiv key={group.title || index}>
            {DomUtil.shouldRender(group.title) && (
              <GroupTitleDiv>{group.title}</GroupTitleDiv>
            )}
            <GroupItemsList>
              {group.items.map((item: IDropDownItem<ILabeled>) => (
                <GroupItem
                  key={item.key}
                  isActive={this.state.activeItem === item}
                  onClick={() => group.onSelectItem(item)}
                  onMouseEnter={() => this.setState({ activeItem: item })}
                  onMouseLeave={() => this.setState({ activeItem: null })}
                >
                  {item.item.label}
                </GroupItem>
              ))}
            </GroupItemsList>
          </GroupContainerDiv>
        ))}
      </ContainerDiv>
    );
  }

  private getNextState(arrowDirection: ArrowDirection): IDropDownState {
    const groups = this.props.groups;
    const firstGroup = groups[0];
    const firstItem = firstGroup.items[0];

    if (
      firstItem === this.state.activeItem &&
      arrowDirection === ArrowDirection.Up
    ) {
      const lastGroup = groups[groups.length - 1];
      return {
        activeItem: lastGroup.items[lastGroup.items.length - 1],
        activeGroup: lastGroup
      };
    }

    if (!this.state.activeItem) {
      return {
        activeItem: firstItem,
        activeGroup: firstGroup
      };
    }

    let previousItem: IDropDownItem<ILabeled> = null;
    let previousGroup: IDropDownItemGroup = null;
    let plusOne: boolean = false;

    for (const group of groups) {
      for (const item of group.items) {
        if (plusOne) {
          return {
            activeItem: item,
            activeGroup: group
          };
        }

        if (item === this.state.activeItem) {
          if (arrowDirection === ArrowDirection.Up) {
            return {
              activeItem: previousItem,
              activeGroup: previousGroup
            };
          } else {
            plusOne = true;
          }
        }

        previousItem = item;
        previousGroup = group;
      }
    }

    return {
      activeItem: firstItem,
      activeGroup: firstGroup
    };
  }
}
