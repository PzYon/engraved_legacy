import * as moment from "moment";
import * as React from "react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IUser } from "../../../shared/src";
import { ngrvd, version } from "../../package.json";
import { CurrentUser } from "../authentication/CurrentUser";
import { ItemStore } from "../items/ItemStore";
import { StyleConstants } from "../styling/StyleConstants";
import { StyleUtil } from "../styling/StyleUtil";
import { Typer } from "./Typer";

const HeaderContainer = styled.header`
  margin: 0 ${StyleConstants.defaultSpacing};
  width: calc(100% - ${StyleConstants.defaultSpacing} - ${StyleConstants.defaultSpacing});
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const AppTitle = styled.h1`
  font-size: ${StyleConstants.headerHeightInPx * 0.5}px;
  font-weight: 400;
  margin: 0;

  ${StyleUtil.normalizeAnchors(StyleConstants.colors.header.text, StyleConstants.colors.accent)};
`;

const CurrentUserSpan = styled.span`
  font-size: 0;
`;

export interface IHeaderProps {
  currentUser: IUser;
}

interface IHeaderState {
  title: string;
}

export class Header extends React.PureComponent<IHeaderProps, IHeaderState> {
  public readonly state: IHeaderState = {
    title: "|"
  };

  public componentDidMount(): void {
    let counter = 0;
    new Typer("engraved.").startTyping((typedText: string) =>
      this.setState({ title: typedText + (counter++ % 2 === 0 ? "|" : "") })
    );
  }

  public render(): ReactNode {
    return (
      <HeaderContainer>
        <AppTitle title={Header.getAppInfo()}>
          <Link
            to={"/"}
            onClick={() => {
              ItemStore.instance.resetAndLoad();
              return true;
            }}
          >
            {this.state.title}
          </Link>
        </AppTitle>
        <CurrentUserSpan>
          <Link to={"/users/me"}>
            <CurrentUser
              user={this.props.currentUser}
              imageSizeInPx={StyleConstants.headerHeightInPx * 0.7}
            />
          </Link>
        </CurrentUserSpan>
      </HeaderContainer>
    );
  }

  private static getAppInfo(): string {
    const buildDate = process.env.NODE_ENV === "development" ? new Date() : ngrvd.buildDate;
    return "Version " + version + "  - Built " + moment(buildDate).fromNow();
  }
}
