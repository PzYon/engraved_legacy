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
        <Image key={f.url} src={f.url} alt={f._id} />
      ))}
    </Container>
  );
};

const Container = styled.div``;

const Image = styled.img`
  margin-right: ${p => p.theme.defaultSpacing};
  margin-bottom: ${p => p.theme.defaultSpacing};
  height: 100px;
`;
