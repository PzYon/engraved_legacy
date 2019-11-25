import * as React from "react";
import { CSSProperties, ReactNode, useRef } from "react";
import styled from "styled-components";
import { useDidMount } from "./Hooks";

const ContainerSection = styled.section`
  opacity: 0;
  transition: opacity ${p => p.theme.transitionTime};
`;

export const FaderContainer = (props: {
  style?: CSSProperties;
  children: ReactNode;
}) => {
  const containerEl = useRef<HTMLDivElement>(null);

  useDidMount(() => {
    setTimeout(() => (containerEl.current.style.opacity = "1"));
  });

  return (
    <ContainerSection style={props.style} ref={containerEl}>
      {props.children}
    </ContainerSection>
  );
};
