import { IAppStats } from "engraved-shared";
import { Express } from "express";
import { Request, Response } from "express-serve-static-core";
import { Db } from "mongodb";
import { BaseAuthenticatedController } from "./BaseAuthenticatedController";

export class AppController extends BaseAuthenticatedController {
  public constructor(app: Express, db: Db) {
    super(app, db);

    this.authenticatedGet("/app/stats", this.getStats);
  }

  private getStats = (req: Request, res: Response): void => {
    Promise.all([
      this.createDbService(req).getTotalNumberOfUsers(),
      this.createDbService(req).getTotalNumberOfItems()
    ]).then(r => {
      const o: IAppStats = {
        commitHash: process.env.HEROKU_SLUG_COMMIT,
        appVersion: process.env.HEROKU_RELEASE_VERSION,
        releaseDate: process.env.HEROKU_RELEASE_CREATED_AT,
        numberOfRegisteredUsers: r[0],
        totalNumberOfItems: r[1]
      };

      res.send(o);
    });
  };
}
