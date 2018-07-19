import { Express } from "express";
import { Request, Response } from "express-serve-static-core";
import { Db } from "mongodb";
import { BaseAuthenticatedController } from "./BaseAuthenticatedController";

export class UserController extends BaseAuthenticatedController {
  public constructor(app: Express, db: Db) {
    super(app, db);

    this.authenticatedGet("/users/me", this.getCurrentUser);
  }

  private getCurrentUser = (req: Request, res: Response): void => {
    res.send(req.user);
  };
}
