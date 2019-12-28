import { IAppStats } from "engraved-shared";
import { Express } from "express";
import { Request } from "express-serve-static-core";
import { Db } from "mongodb";
import { BaseAuthenticatedController } from "./BaseAuthenticatedController";

export class AppController extends BaseAuthenticatedController {
  public constructor(app: Express, db: Db) {
    super(app, db);

    this.authenticatedGet("/app/stats", this.getStats);
  }

  private getStats = (req: Request): Promise<IAppStats> => {
    return Promise.all([
      this.createDbService(req).getTotalNumberOfUsers(),
      this.createDbService(req).getTotalNumberOfItems()
    ]).then(r => {
      return {
        commitHash: process.env.HEROKU_SLUG_COMMIT,
        appVersion: process.env.HEROKU_RELEASE_VERSION,
        releaseDate: process.env.HEROKU_RELEASE_CREATED_AT,
        numberOfRegisteredUsers: r[0],
        totalNumberOfItems: r[1]
      };
    });
  };
}
