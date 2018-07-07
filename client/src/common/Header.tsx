import * as React from "react";
import {ReactNode} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {IUser} from "../../../shared/src";
import {CurrentUser} from "../authentication/CurrentUser";
import {StyleConstants} from "../styling/StyleConstants";
import {StyleUtil} from "../styling/StyleUtil";
import {Typer} from "./Typer";

const HeaderContainerDiv = styled.div`
  margin: 0 ${StyleConstants.defaultMargin};
  width: calc(100% - ${StyleConstants.defaultMargin} - ${StyleConstants.defaultMargin});
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const AppTitle = styled.h1`
  font-size: ${StyleConstants.headerHeightInPx * 0.7}px;
  margin: 0;

  ${StyleUtil.normalizeAnchors(StyleConstants.colors.header.text)}
  
  a:hover {
    color: ${StyleConstants.colors.accent};
  }
`;

const CurrentUserSpan = styled.span`
  font-size: 0;
`;

export interface IHeaderProps {
    currentUser: IUser;
}

interface IHeaderState {
    title: string;
}

export class Header extends React.PureComponent<IHeaderProps, IHeaderState> {
    public constructor(props: IHeaderProps) {
        super(props);

        this.state = {
            title: ""
        };

        new Typer("engraved.").startTyping((typedText: string) => this.setState({title: typedText}));
    }

    public render(): ReactNode {
        return (
            <HeaderContainerDiv>
                <AppTitle>
                    <Link to={"/"}>
                        {this.state.title}
                    </Link>
                </AppTitle>
                <CurrentUserSpan>
                    <CurrentUser
                        user={this.props.currentUser}
                        imageSizeInPx={StyleConstants.headerHeightInPx * 0.7}
                    />
                </CurrentUserSpan>
            </HeaderContainerDiv>
        );
    }
}
