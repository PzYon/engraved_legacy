import { IFile } from "engraved-shared";
import * as React from "react";
import styled from "styled-components";

export interface IItemFilesProps {
  files: IFile[];
  style?: React.CSSProperties;
}

export const ItemFiles: React.FC<IItemFilesProps> = (
  props: IItemFilesProps
) => {
  return (
    <Container style={props.style}>
      {(props.files || []).map(f => (
        <ImageContainer key={f.url}>
          <a href={f.url} target="_blank" rel="noopener noreferrer">
            <Image src={f.url} alt={f.label} />
          </a>
        </ImageContainer>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  margin-right: ${p => p.theme.defaultSpacing};
  margin-bottom: ${p => p.theme.defaultSpacing};
  height: 100px;
`;
