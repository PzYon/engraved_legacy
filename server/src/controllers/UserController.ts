import { IUserStats } from "engraved-shared";
import { Express } from "express";
import { Request, Response } from "express-serve-static-core";
import { Db } from "mongodb";
import { BaseAuthenticatedController } from "./BaseAuthenticatedController";

export class UserController extends BaseAuthenticatedController {
  public constructor(app: Express, db: Db) {
    super(app, db);

    this.authenticatedGet("/users/me", this.getCurrentUser);
    this.authenticatedGet("/users/me/stats", this.getStats);
    this.authenticatedPost("/users/me/settings/:key", this.saveSetting);
  }

  private getCurrentUser = (req: Request, res: Response): void => {
    res.send(req.user);
  };

  private getStats = (req: Request, res: Response): void => {
    this.createDbService(req)
      .getMyStats()
      .then((stats: IUserStats) => {
        res.send({ ...stats, ...process.env });
      });
  };

  private saveSetting = (req: Request, res: Response): void => {
    this.createDbService(req)
      .saveUserSetting(req.params.key, req.body.value)
      .then(res.send);
  };
}
