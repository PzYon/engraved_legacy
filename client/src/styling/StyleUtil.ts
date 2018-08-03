import { css, InterpolationValue } from "styled-components";

export class StyleUtil {
  public static normalizeAnchors(color: string, hoverColor?: string): InterpolationValue[] {
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

  public static getEllipsis(): InterpolationValue[] {
    return css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `;
  }
}
