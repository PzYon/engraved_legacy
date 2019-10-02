import { IAppStats } from "engraved-shared";
import { useState } from "react";
import * as React from "react";
import styled from "styled-components";
import { AuthenticatedServerApi } from "./authentication/AuthenticatedServerApi";
import { formatDate } from "./common/FormatDate";
import { useDidMount } from "./common/Hooks";

export const Footer = () => {
  const [stats, setStats] = useState<IAppStats>(null);

  useDidMount(() => {
    const sub1 = AuthenticatedServerApi.get("app/stats").subscribe((s: IAppStats) => {
      s.appVersion = s.appVersion || "vDev";
      s.commitHash = s.commitHash || "2bc15f981007dd25daee3ef13bbe14802f821c5b"; // initial ;)
      s.releaseDate = s.releaseDate || new Date().toISOString();

      setStats(s);
    });

    return () => sub1.unsubscribe();
  });

  if (!stats) {
    return null;
  }

  return (
    <Container>
      <Inner>
        <span>
          <a href={"https://github.com/PzYon/engraved/commit/" + stats.commitHash} onClick={void 0}>
            {stats.appVersion}
          </a>
        </span>
        <span>released {formatDate(stats.releaseDate)}</span>
      </Inner>
      <Inner>
        <span>{formatLabel(stats.numberOfRegisteredUsers, "user")}</span>
        <span>{formatLabel(stats.totalNumberOfItems, "item")}</span>
      </Inner>
    </Container>
  );
};

const formatLabel = (n: number, label: string) => {
  return `${n} ${label}${n === 1 ? "" : "s"}`;
};

const Container = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: ${p => p.theme.defaultSpacing};
  font-size: ${p => p.theme.font.size.small};
  transition: opacity ease-in ${p => p.theme.transitionTime};
`;

const Inner = styled.span`
  span:not(:last-of-type)::after {
    content: "\\00B7";
    margin: 0 0.4rem;
  }
`;
