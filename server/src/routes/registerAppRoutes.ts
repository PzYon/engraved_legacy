import { IAppStats } from "engraved-shared";
import { Express } from "express";
import { IRequest } from "../IRequest";
import { HttpAction, registerRoute } from "./routeStuff";

export const registerAppRoutes = (app: Express) => {
  registerRoute(
    app,
    "/app/stats",
    HttpAction.Get,
    (req: IRequest): Promise<IAppStats> => {
      const dbService = req.serviceFactory.createDbService();

      return Promise.all([
        dbService.getTotalNumberOfUsers(),
        dbService.getTotalNumberOfItems()
      ]).then(r => {
        return {
          commitHash: process.env.HEROKU_SLUG_COMMIT,
          appVersion: process.env.HEROKU_RELEASE_VERSION,
          releaseDate: process.env.HEROKU_RELEASE_CREATED_AT,
          numberOfRegisteredUsers: r[0],
          totalNumberOfItems: r[1]
        };
      });
    }
  );
};
