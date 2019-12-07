import { IAppStats } from "engraved-shared";
import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { AuthenticatedServerApi } from "./authentication/AuthenticatedServerApi";
import { formatDate } from "./common/FormatDate";
import { useDidMount } from "./common/Hooks";

export const Footer = () => {
  const [stats, setStats] = useState<IAppStats>(null);

  useDidMount(() => {
    const sub = AuthenticatedServerApi.get<IAppStats>("app/stats").subscribe(
      (s: IAppStats) => {
        s.appVersion = s.appVersion || "vDev";
        s.commitHash =
          s.commitHash || "2bc15f981007dd25daee3ef13bbe14802f821c5b"; // initial ;)
        s.releaseDate = s.releaseDate || new Date().toISOString();

        setStats(s);
      }
    );

    return () => sub.unsubscribe();
  });

  if (!stats) {
    return null;
  }

  return (
    <Container>
      <Inner className={"ngrvd-left"}>
        <span>
          <a
            href={
              "https://github.com/PzYon/engraved/commit/" + stats.commitHash
            }
          >
            {stats.appVersion}
          </a>
        </span>
        <span>Released {formatDate(stats.releaseDate)}</span>
        <span>
          Got{" "}
          <a href={"https://github.com/PzYon/engraved/issues/new"}>feedback</a>?
        </span>
      </Inner>
      <Inner className={"ngrvd-right"}>
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

  @media (max-width: 900px) {
    border-top: 1px solid ${p => p.theme.colors.border};
    background-color: ${p => p.theme.colors.formElementBackground};
    line-height: 1.3rem;

    .ngrvd-right {
      text-align: right;
    }
  }
`;

const Inner = styled.span`
  @media (min-width: 901px) {
    span:not(:last-of-type)::after {
      content: "\\00B7";
      margin: 0 0.4rem;
    }
  }

  @media (max-width: 900px) {
    span {
      display: block;
    }
  }
`;
