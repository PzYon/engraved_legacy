import { IUserStats } from "engraved-shared";
import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { AuthenticatedServerApi } from "../authentication/AuthenticatedServerApi";
import { DomUtil } from "../common/DomUtil";
import { FormatDate } from "../common/FormatDate";
import { useDidMount } from "../common/Hooks";
import { ThemePicker } from "../styling/ThemePicker";
import { Page } from "./Page";

export const UserPage = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState<IUserStats>(null);

  useDidMount(() => {
    const sub1 = AuthenticatedServerApi.currentUser$.subscribe(setUser);
    const sub2 = AuthenticatedServerApi.get("users/me/stats").subscribe(
      setStats
    );

    return () => {
      sub1.unsubscribe();
      sub2.unsubscribe();
    };
  });

  if (!user) {
    return null;
  }

  return (
    <Page
      browserTitle={user.displayName}
      title={`Greetings ${user.displayName}`}
    >
      <p>
        Your mail address is <Highlight>{user.mail}</Highlight> and you signed
        up{" "}
        <Highlight>
          <FormatDate value={user.memberSince} />
        </Highlight>
        .
      </p>
      {DomUtil.shouldRender(stats) && (
        <p>
          You've created <Highlight>{stats.itemCount}</Highlight> items and{" "}
          <Highlight>{stats.keywordCount}</Highlight> keywords.
        </p>
      )}
      <UserSettingsContainer>
        <UserSettingsTitle>Your Settings</UserSettingsTitle>
        <ThemePicker />
      </UserSettingsContainer>
    </Page>
  );
};

const Highlight = styled.span`
  font-weight: ${p => p.theme.font.weight.bold};
`;

const UserSettingsContainer = styled.section`
    border-top: 1px solid ${p => p.theme.colors.border};
    margin-top: ${p => p.theme.defaultSpacing};
    padding-top: ${p => p.theme.defaultSpacing};
}
`;

const UserSettingsTitle = styled.div`
  font-size: ${p => p.theme.font.size.large};
`;
