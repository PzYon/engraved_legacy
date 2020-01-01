import { IKeyword } from "engraved-shared";
import { Express } from "express";
import { IRequest } from "../IRequest";
import { HttpAction, registerRoute } from "./routeStuff";

export const registerKeywordRoutes = (app: Express) => {
  registerRoute(
    app,
    "/keywords",
    HttpAction.Get,
    (req: IRequest): Promise<IKeyword[]> =>
      req.serviceFactory.createDbService().searchKeywords(req.query.q)
  );
};
