import {IUser} from "engraved-shared";
import * as React from "react";
import styled from "styled-components";

const ImageContainer = styled.span`
  display: inline-block;
  font-size: 0;

  img {
    height: ${(p: { imageSizeInPx: number }) => p.imageSizeInPx + "px"};
    border-radius: 50%;
  }
`;

interface ICurrentUserProps {
    user: IUser;
    imageSizeInPx: number;
}

export const CurrentUser: React.SFC<ICurrentUserProps> = (props: ICurrentUserProps) => {
    if (!props.user) {
        return null;
    }

    return (
        <ImageContainer
            title={props.user.displayName + " | " + props.user.mail}
            imageSizeInPx={props.imageSizeInPx}
        >
            <img src={props.user.image}/>
        </ImageContainer>
    );
};