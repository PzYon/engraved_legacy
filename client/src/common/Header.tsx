import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IUser } from "../../../shared/src";
import { ngrvd, version } from "../../package.json";
import { CurrentUser } from "../authentication/CurrentUser";
import { ItemStore } from "../items/ItemStore";
import { StyleUtil } from "../styling/StyleUtil";
import { formatDate } from "./FormatDate";
import { Typing } from "./Typing";

export interface IHeaderProps {
  currentUser: IUser;
}

export const Header = (props: IHeaderProps) => {
  return (
    <HeaderContainer>
      <AppTitle title={getAppInfo()}>
        <Link
          to={"/"}
          onClick={() => {
            ItemStore.instance.resetAndLoad();
            return true;
          }}
        >
          <Typing textToType={"engraved."} />
        </Link>
      </AppTitle>
      <CurrentUserSpan>
        <Link to={"/users/me"}>
          <CurrentUser user={props.currentUser} />
        </Link>
      </CurrentUserSpan>
    </HeaderContainer>
  );
};

const getAppInfo = (): string => {
  const buildDate = process.env.NODE_ENV === "development" ? new Date() : ngrvd.buildDate;
  return "Version " + version + "  - Built " + formatDate(buildDate);
};

const HeaderContainer = styled.header`
  margin: 0 ${p => p.theme.defaultSpacing};
  width: calc(100% - ${p => p.theme.defaultSpacing} - ${p => p.theme.defaultSpacing});
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const AppTitle = styled.h1`
  font-size: ${p => p.theme.headerHeightInPx * 0.5}px;
  font-weight: ${p => p.theme.font.weight.normal};
  margin: 0;

  ${p => StyleUtil.normalizeAnchors(p.theme.colors.header.text, p.theme.colors.accent)};
`;

const CurrentUserSpan = styled.span`
  font-size: 0;
`;
