import * as React from "react";
import { useRef } from "react";
import styled from "styled-components";
import { useDidMount } from "./common/Hooks";
import { Util } from "./Util";

const Container = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: ${p => p.theme.defaultSpacing};
  font-size: ${p => p.theme.font.size.small};
  transition: opacity ease-in ${p => p.theme.transitionTime};
  opacity: 0;

  &.visible {
    opacity: 1;
  }
`;

export const Footer = () => {
  const container = useRef<HTMLDivElement>(null);

  useDidMount(() => {
    const timer = setTimeout(() => (container.current.className += " visible"), 500);
    return () => clearTimeout(timer);
  });

  return (
    <Container ref={container}>
      <span>{Util.getAppInfo()}</span>
      <span>
        View on{" "}
        <a href={"https://github.com/PzYon/engraved"} onClick={void 0}>
          GitHub
        </a>
      </span>
    </Container>
  );
};
