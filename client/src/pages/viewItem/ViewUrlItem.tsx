import { IUrlItem } from "engraved-shared";
import { ReactNode } from "react";
import * as React from "react";
import styled from "styled-components";
import { StyleConstants } from "../../styling/StyleConstants";
import { StyleUtil } from "../../styling/StyleUtil";
import { IViewItemProps } from "./IViewItemProps";

const UrlInputDiv = styled.div`
  position: relative;
`;

const UrlInput = styled.input`
  border: 1px solid ${StyleConstants.colors.discreet};
  background-color: ${StyleConstants.colors.ultraDiscreet};
  padding: 0.3rem 0.3rem 0.3rem 2rem !important;
  width: calc(100% - 2.3rem) !important;
  min-width: calc(100% - 2.3rem) !important;
  max-width: calc(100% - 2.3rem) !important;
`;

const FavIconImg = styled.img`
  position: absolute;
  background-color: ${StyleConstants.colors.ultraDiscreet};
  height: 1.5rem;
  left: 0.25rem;
  top: 0.25rem;
  opacity: 0;
  transition: opacity 0.8s;
`;

const ActionDiv = styled.div`
  ${StyleUtil.normalizeAnchors(StyleConstants.colors.accent)};
  font-size: 0.7rem;
`;

export class ViewUrlItem extends React.PureComponent<IViewItemProps<IUrlItem>> {
  private inputEl: HTMLInputElement;

  private imageEl: HTMLImageElement;

  public render(): ReactNode {
    return (
      <div>
        <UrlInputDiv>
          <UrlInput
            readOnly={true}
            innerRef={r => (this.inputEl = r)}
            value={this.props.item.url}
          />
          <FavIconImg
            innerRef={r => (this.imageEl = r)}
            src={this.getFaviconUrl()}
            onLoad={() => (this.imageEl.style.opacity = "1")}
          />
        </UrlInputDiv>
        <ActionDiv>
          <a href={this.props.item.url} target="_blank">
            open
          </a>
          &nbsp;|&nbsp;
          <a href="javascript:void(0)" onClick={this.copyToClipBoard}>
            copy URL
          </a>
        </ActionDiv>
      </div>
    );
  }

  private getFaviconUrl(): string {
    const parser = document.createElement("a");
    parser.href = this.props.item.url;

    return `${parser.origin}/favicon.ico`;
  }

  private copyToClipBoard = (): void => {
    this.inputEl.select();
    document.execCommand("copy");
  };
}
