import * as React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {IRedirection} from "../../../IRedirection";
import {StyleConstants} from "../../../styling/StyleConstants";
import {StyleUtil} from "../../../styling/StyleUtil";
import {IDropDownItem} from "../IDropDownItem";

const Container = styled.span`
  ${StyleUtil.normalizeAnchors(StyleConstants.colors.font)}
`;

export class RedirectDropDownItem implements IDropDownItem<IRedirection> {
    public get key(): string {
        return this.item.url;
    }

    public get nodeOrLabel(): React.ReactNode {
        return (
            <Container>
                <Link to={this.item.url} key={this.key}>
                    {this.item.label}
                </Link>
            </Container>
        )
    }

    public constructor(public item: IRedirection) {
    }
}
