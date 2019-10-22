import { ItemKind, IUrlItem } from "engraved-shared";
import * as React from "react";
import { useRef } from "react";
import styled from "styled-components";
import { ButtonStyle, FormButton } from "../../common/form/buttons/FormButton";
import { useFlag, useTheme } from "../../common/Hooks";
import { If } from "../../common/If";
import { ItemKindIcon } from "../../common/ItemKindIcon";
import { IViewItemProps } from "../IViewItemProps";

export const ViewUrlItem = (props: IViewItemProps<IUrlItem>) => {
  const theme = useTheme();
  const inputEl = useRef<HTMLInputElement>(null);
  const imageAnchorEl = useRef<HTMLAnchorElement>(null);
  const [showFallbackIcon, toggleShowFallbackIcon] = useFlag(false);

  return (
    <>
      <UrlInputDiv>
        <UrlInput readOnly={true} ref={inputEl} value={props.item.url} />
        <IconAnchor ref={imageAnchorEl} href={props.item.url} target="_blank">
          <If
            value={!showFallbackIcon}
            render={() => (
              <IconImage
                src={getFaviconUrl()}
                onLoad={() => (imageAnchorEl.current.style.opacity = "1")}
                onError={() => {
                  toggleShowFallbackIcon(true);
                  imageAnchorEl.current.style.opacity = "1";
                }}
              />
            )}
            renderElse={() => <ItemKindIcon itemKind={ItemKind.Url} />}
          />
        </IconAnchor>
      </UrlInputDiv>
      <ActionDiv>
        <a href={props.item.url} target="_blank">
          open
        </a>
        &nbsp;&middot;&nbsp;
        <FormButton
          button={{
            fontSize: theme.font.size.small,
            buttonStyle: ButtonStyle.LinkLike,
            onClick: copyToClipBoard,
            label: "copy URL"
          }}
        />
      </ActionDiv>
    </>
  );

  function getFaviconUrl(): string {
    const parser = document.createElement("a");
    parser.href = props.item.url;

    return `${parser.origin}/favicon.ico`;
  }

  function copyToClipBoard(): void {
    inputEl.current.select();
    document.execCommand("copy");
  }
};

const IconAnchor = styled.a`
  position: absolute;
  background-color: ${p => p.theme.colors.palette.shades.light};
  color: ${p => p.theme.colors.accent};
  height: 1.5rem;
  left: 0.25rem;
  top: 0.25rem;
  opacity: 0;
  transition: opacity 0.5s;
  font-size: ${p => p.theme.font.size.small};
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const UrlInputDiv = styled.div`
  position: relative;
`;

const UrlInput = styled.input`
  border: 1px solid ${p => p.theme.colors.border};
  background-color: ${p => p.theme.colors.palette.shades.light};
  padding: 0.3rem 0.3rem 0.3rem 2rem !important;
  width: calc(100% - 2.3rem - 2px) !important;
  min-width: calc(100% - 2.3rem - 2px) !important;
  max-width: calc(100% - 2.3rem - 2px) !important;
`;

const IconImage = styled.img`
  height: 1.5rem;
`;

const ActionDiv = styled.div`
  font-size: ${p => p.theme.font.size.small};
  margin-top: ${p => p.theme.formElementPadding};
`;
