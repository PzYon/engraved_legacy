import * as React from "react";
import {ReactNode} from "react";
import styled from "styled-components";
import {StyleConstants} from "./StyleConstants";

const RootDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  background-color: rgba(0, 0, 0, 0.5);
`;

const InnerDiv = styled.div`
  max-width: 1100px;
  max-height: calc(100vh - 20px);
  padding: 10px;
  background-color: deeppink;
  position: relative;
`;

const TitleDiv = styled.div`
  font-weight: bold;
`;

const CloseSpan = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const ContentDiv = styled.div`
  margin: ${StyleConstants.defaultPadding} 0;
`;

export interface IDialogProps {
    children: ReactNode;
    title?: string;
    onClose?: () => void;
}

export const Dialog: React.SFC<IDialogProps> = (props: IDialogProps) => (
    <RootDiv>
        <InnerDiv>
            {
                props.title
                && (
                    <TitleDiv>
                        {props.title}
                    </TitleDiv>
                )
            }
            <CloseSpan onClick={props.onClose ? props.onClose : void(0)}>
                x
            </CloseSpan>
            <ContentDiv>
                {props.children}
            </ContentDiv>
        </InnerDiv>
    </RootDiv>
);
