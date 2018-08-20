import { ItemKind, IUrlItem } from "engraved-shared";
import * as React from "react";
import { ReactNode } from "react";
import styled from "styled-components";
import { If } from "../../common/If";
import { ItemKindIcon } from "../../common/ItemKindIcon";
import { StyleConstants } from "../../styling/StyleConstants";
import { IViewItemProps } from "../IViewItemProps";

const IconAnchor = styled.a`
  position: absolute;
  background-color: ${StyleConstants.colors.ultraDiscreet};
  color: ${StyleConstants.colors.accent};
  height: 1.5rem;
  left: 0.25rem;
  top: 0.25rem;
  opacity: 0;
  transition: opacity 0.5s;
  font-size: 0.7rem;
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const UrlInputDiv = styled.div`
  position: relative;
`;

const UrlInput = styled.input`
  border: 1px solid ${StyleConstants.colors.discreet};
  background-color: ${StyleConstants.colors.ultraDiscreet};
  padding: 0.3rem 0.3rem 0.3rem 2rem !important;
  width: calc(100% - 2.3rem - 2px) !important;
  min-width: calc(100% - 2.3rem - 2px) !important;
  max-width: calc(100% - 2.3rem - 2px) !important;
`;

const IconImage = styled.img`
  height: 1.5rem;
`;

const ActionDiv = styled.div`
  font-size: ${StyleConstants.font.small};
`;

interface IViewUrlItemState {
  showFallbackIcon: boolean;
}

export class ViewUrlItem extends React.PureComponent<IViewItemProps<IUrlItem>, IViewUrlItemState> {
  private inputEl: HTMLInputElement;

  private imageAnchorEl: HTMLImageElement;

  public readonly state: IViewUrlItemState = {
    showFallbackIcon: false
  };

  public render(): ReactNode {
    return (
      <div>
        <UrlInputDiv>
          <UrlInput
            readOnly={true}
            innerRef={r => (this.inputEl = r)}
            value={this.props.item.url}
          />
          <IconAnchor
            innerRef={r => (this.imageAnchorEl = r)}
            href={this.props.item.url}
            target="_blank"
          >
            <If
              value={!this.state.showFallbackIcon}
              render={() => (
                <IconImage
                  src={this.getFaviconUrl()}
                  onLoad={() => (this.imageAnchorEl.style.opacity = "1")}
                  onError={() => {
                    this.setState({ showFallbackIcon: true });
                    this.imageAnchorEl.style.opacity = "1";
                  }}
                />
              )}
              renderElse={() => <ItemKindIcon itemKind={ItemKind.Url} />}
            />
          </IconAnchor>
        </UrlInputDiv>
        <ActionDiv>
          <a href={this.props.item.url} target="_blank">
            open
          </a>
          &nbsp;&middot;&nbsp;
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
