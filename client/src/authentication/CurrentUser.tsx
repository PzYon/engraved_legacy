import * as React from "react";
import styled from "styled-components";
import {IUser} from "../../../shared/src";

const ImageContainer = styled.span`
  display: inline-block;
  font-size: 0;
  
  position: absolute;
  right: 5px;
  top: 5px;
  
  img {
    border-radius: 50%;
  }
`;

interface ICurrentUserProps {
    user: IUser;
}

export const CurrentUser: React.SFC<ICurrentUserProps> = (props: ICurrentUserProps) => {
    if (!props.user) {
        return null;
    }

    return (
        <ImageContainer title={props.user.displayName + " | " + props.user.mail}>
            <img src={props.user.image}/>
        </ImageContainer>
    );
};