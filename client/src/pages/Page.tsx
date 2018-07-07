import * as React from "react";
import {ReactNode} from "react";
import styled from "styled-components";
import {StyleConstants} from "../styling/StyleConstants";

const ContainerDiv = styled.div`
  padding: ${StyleConstants.defaultPadding};
`;

const H1 = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
  color: ${StyleConstants.colors.accent};
  margin-top: 0;
`;

const ContentDiv = styled.div`
  margin: ${StyleConstants.defaultPadding} 0;
`;

export interface IPageProps {
    children: ReactNode;
    title?: string;
    browserTitle?: string;
}

export const Page: React.SFC<IPageProps> = (props: IPageProps) => {
    document.title = props.browserTitle
                     ? "engraved. | " + props.browserTitle
                     : "engraved.";

    return (
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
    );
};
