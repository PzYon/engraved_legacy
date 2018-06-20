import {css, InterpolationValue} from "styled-components";

export class StyleUtil {
    public static normalizeAnchors(color: string): InterpolationValue[] {
        return css`
a,
a:link,
a:visited,
a:active {
    color: ${color};
    text-decoration: none;
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