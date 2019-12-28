import { IUserStats } from "engraved-shared";
import { Express } from "express";
import { Request } from "express-serve-static-core";
import { Db } from "mongodb";
import { BaseAuthenticatedController } from "./BaseAuthenticatedController";

export class UserController extends BaseAuthenticatedController {
  public constructor(app: Express, db: Db) {
    super(app, db);

    this.authenticatedGet("/users/me", this.getCurrentUser);
    this.authenticatedGet("/users/me/stats", this.getStats);
    this.authenticatedPost("/users/me/settings/:key", this.saveSetting);
  }

  private getCurrentUser = (req: Request): Promise<any> => {
    return Promise.resolve(req.user);
  };

  private getStats = (req: Request): Promise<IUserStats> => {
    return this.createDbService(req).getMyStats();
  };

  private saveSetting = (req: Request): Promise<any> => {
    return this.createDbService(req).saveUserSetting(
      req.params.key,
      req.body.value
    );
  };
}
