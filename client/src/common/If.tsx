import * as React from "react";
import { ReactNode } from "react";

export interface IOnlyIfNotNullProps<T = {}> {
  value: T;
  children?: ReactNode;
  condition?: (value: T) => boolean;
  render?: () => ReactNode;
  renderElse?: () => ReactNode;
}

export const If: React.FC<IOnlyIfNotNullProps> = (props: IOnlyIfNotNullProps): any => {
  const v: any = props.value;

  const isIf: boolean = props.condition
    ? props.condition(v)
    : !(
        v === false ||
        v === null ||
        v === undefined ||
        v === "" ||
        (Array.isArray(v) && v.length === 0)
      );

  if (!isIf) {
    return props.renderElse ? props.renderElse() : null;
  }

  return props.render ? props.render() : props.children;
};
