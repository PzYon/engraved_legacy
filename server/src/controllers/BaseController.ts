import { IUser } from "engraved-shared";
import { Express } from "express";
import { Request } from "express-serve-static-core";
import { Db } from "mongodb";
import { DbService } from "../DbService";
import { Cloudinary } from "../files/Cloudinary";

export abstract class BaseController {
  protected constructor(_: Express, private db: Db) {}

  protected createDbService(req: Request): DbService {
    return new DbService(this.db, req.user as IUser, () => new Cloudinary());
  }
}
