import { useState } from "react";
import * as React from "react";
import styled from "styled-components";
import { IFile } from "engraved-shared";
import { Closer } from "../../../Closer";

export const ItemFile: React.FC<{
  onDelete: (file: IFile) => void;
  file: IFile;
}> = props => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ImageContainer style={{ opacity: isLoaded ? 1 : 0 }}>
      {props.onDelete && (
        <Closer
          onClose={() => props.onDelete(props.file)}
          title={"Delete file"}
        />
      )}
      <a
        href={props.file.url}
        target="_blank"
        title={props.file.label}
        rel="noopener noreferrer"
      >
        <Image
          src={props.file.url}
          alt={props.file.label}
          onLoad={() => setIsLoaded(true)}
        />
      </a>
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  transition: opacity 1s;

  .ngrvd-closer {
    right: 18px;
    top: -10px;
  }
`;

const Image = styled.img`
  margin-right: ${p => p.theme.defaultSpacing};
  margin-bottom: ${p => p.theme.defaultSpacing};
  height: 150px;
  border: 1px solid ${p => p.theme.colors.border};
`;
