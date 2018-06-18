import * as React from "react";
import {ReactNode} from "react";
import styled from "styled-components";
import {ErrorBoundary} from "./ErrorBoundary";
import {StyleConstants} from "./styling/StyleConstants";

const ContainerDiv = styled.div`
  padding: 20px;
`;

const H1 = styled.h1`
  font-weight: bold;
  margin-top: 0;
`;

const ContentDiv = styled.div`
  margin: ${StyleConstants.defaultPadding} 0;
`;

export interface IPageProps {
    children: ReactNode;
    title?: string;
}

export const Page: React.SFC<IPageProps> = (props: IPageProps) => (
    <ErrorBoundary>
        <ContainerDiv>
            {
                props.title
                && (
                    <H1>
                        {props.title}
                    </H1>
                )
            }
            <ContentDiv>
                {props.children}
            </ContentDiv>
        </ContainerDiv>
    </ErrorBoundary>
);
