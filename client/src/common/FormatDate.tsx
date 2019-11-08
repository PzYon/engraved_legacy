import { format, formatDistanceToNow } from "date-fns";
import * as React from "react";

export enum DateFormat {
  relativeToNow,
  full,
  ticks
}

export const formatDate = (value: any, dateFormat?: DateFormat): string => {
  let date;
  if (typeof value === "string" || typeof value === "number") {
    date = new Date(value);
  } else if (value instanceof Date) {
    date = value;
  } else {
    throw new Error(`'${value}' is an invalid date.`);
  }

  switch (dateFormat) {
    case DateFormat.full:
      return format(date, "PPPPpppp");
    case DateFormat.ticks:
      return format(date, "T");
    case DateFormat.relativeToNow:
    default:
      return formatDistanceToNow(date, {
        addSuffix: true,
        includeSeconds: true
      });
  }
};

export interface IFormatDateProps {
  value: Date | string | number;
  dateFormat?: DateFormat;
}

export const FormatDate = (props: IFormatDateProps) => (
  <span title={formatDate(props.value, props.dateFormat || DateFormat.full)}>
    {formatDate(props.value)}
  </span>
);
