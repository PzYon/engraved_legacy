import { IUser } from "engraved-shared";
import * as React from "react";
import styled from "styled-components";

const ImageContainer = styled.span`
  display: inline-block;
  font-size: 0;

  img {
    height: ${p => p.theme.headerHeightInPx * 0.7}px;
    border-radius: 50%;
  }
`;

interface ICurrentUserProps {
  user: IUser;
}

export const CurrentUser: React.FC<ICurrentUserProps> = (props: ICurrentUserProps) => {
  if (!props.user) {
    return null;
  }

  const title = props.user.displayName + " | " + props.user.mail;

  return (
    <ImageContainer title={title}>
      <img src={props.user.image} alt={title} />
    </ImageContainer>
  );
};
