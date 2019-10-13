import { css } from "styled-components";

export class StyleUtil {
  public static normalizeAnchors(color: string, hoverColor?: string) {
    return css`
      a,
      a:link,
      a:visited,
      a:active {
        color: ${color};
        text-decoration: none;
        transition: color 0.3s;
      }

      a:hover {
        color: ${hoverColor || color};
      }
    `;
  }

  public static getEllipsis() {
    return css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `;
  }
}
