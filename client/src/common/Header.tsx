import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IUser } from "../../../shared/src";
import { ngrvd, version } from "../../package.json";
import { CurrentUser } from "../authentication/CurrentUser";
import { ItemStore } from "../items/ItemStore";
import { StyleConstants } from "../styling/StyleConstants";
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
          <CurrentUser
            user={props.currentUser}
            imageSizeInPx={StyleConstants.headerHeightInPx * 0.7}
          />
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
  margin: 0 ${StyleConstants.defaultSpacing};
  width: calc(100% - ${StyleConstants.defaultSpacing} - ${StyleConstants.defaultSpacing});
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const AppTitle = styled.h1`
  font-size: ${StyleConstants.headerHeightInPx * 0.5}px;
  font-weight: ${StyleConstants.font.weight.normal};
  margin: 0;

  ${StyleUtil.normalizeAnchors(StyleConstants.colors.header.text, StyleConstants.colors.accent)};
`;

const CurrentUserSpan = styled.span`
  font-size: 0;
`;
