import { IFile } from "engraved-shared";
import * as React from "react";
import styled from "styled-components";
import { Closer } from "../../../Closer";

export interface IItemFilesProps {
  files: IFile[];
  style?: React.CSSProperties;
  onDelete?: (file: IFile) => void;
}

export const ItemFiles: React.FC<IItemFilesProps> = (
  props: IItemFilesProps
) => {
  return (
    <Container style={props.style}>
      {(props.files || []).map(f => (
        <ImageContainer key={f.url}>
          {props.onDelete && (
            <Closer onClose={() => props.onDelete(f)} title={"Delete file"} />
          )}
          <a
            href={f.url}
            target="_blank"
            title={f.label}
            rel="noopener noreferrer"
          >
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
  position: relative;

  .ngrvd-closer {
    right: 20px;
  }
`;

const Image = styled.img`
  margin-right: ${p => p.theme.defaultSpacing};
  margin-bottom: ${p => p.theme.defaultSpacing};
  height: 150px;
`;
