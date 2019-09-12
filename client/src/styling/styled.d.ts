import "styled-components";
import { ITheme } from "./ITheme";

declare module "styled-components" {
  export interface DefaultTheme extends ITheme {}
}
