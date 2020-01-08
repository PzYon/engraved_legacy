import { IFile } from "engraved-shared";
import * as React from "react";
import styled from "styled-components";
import { ItemFile } from "./ItemFile";

export const ItemFiles: React.FC<{
  files: IFile[];
  style?: React.CSSProperties;
  onDelete?: (file: IFile) => void;
}> = ({ files, style, onDelete }) => {
  return (
    <Container style={style}>
      {(files || []).map(f => (
        <ItemFile key={f.url} onDelete={onDelete} file={f} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;
