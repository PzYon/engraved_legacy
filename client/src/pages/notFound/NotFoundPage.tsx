import * as React from "react";
import { Page } from "../Page";

export const NotFoundPage: React.FC = () => (
  <Page browserTitle={"Oh boy..."} title={"Oh boy..."}>
    What you're looking for doesn't seem to exist. Either you f*cked up or the developer. Normally
    it's the developer...
  </Page>
);
