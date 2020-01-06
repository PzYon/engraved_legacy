import { IUserStats } from "engraved-shared";
import { Express } from "express";
import { Request } from "express-serve-static-core";
import { IRequest } from "../IRequest";
import { HttpAction, registerRoute } from "./routerHelpers";

export const registerUserRoutes = (app: Express) => {
  registerRoute(
    app,
    "/users/me",
    HttpAction.Get,
    (req: Request): Promise<any> => Promise.resolve(req.user)
  );

  registerRoute(
    app,
    "/users/me/stats",
    HttpAction.Get,
    (req: IRequest): Promise<IUserStats> => {
      return req.serviceFactory.createDbService().getMyStats();
    }
  );

  registerRoute(
    app,
    "/users/me/settings/:key",
    HttpAction.Post,
    (req: IRequest): Promise<void> => {
      return req.serviceFactory
        .createDbService()
        .saveUserSetting(req.params.key, req.body.value);
    }
  );
};
