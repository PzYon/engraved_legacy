import { IUser } from "engraved-shared";
import { Express } from "express";
import { Request } from "express-serve-static-core";
import { Db } from "mongodb";
import { DbService } from "../DbService";

export abstract class BaseController {
  protected constructor(app: Express, private db: Db) {}

  protected createDbService(req: Request): DbService {
    return new DbService(this.db, req.user as IUser);
  }
}
