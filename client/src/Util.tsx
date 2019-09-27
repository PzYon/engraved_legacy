import { ngrvd, version } from "../package.json";
import { formatDate } from "./common/FormatDate";

export class Util {
  public static getAppInfo = (): string => {
    const buildDate = process.env.NODE_ENV === "development" ? new Date() : ngrvd.buildDate;
    return "Version " + version + "  - Deployed " + formatDate(buildDate);
  };
}
