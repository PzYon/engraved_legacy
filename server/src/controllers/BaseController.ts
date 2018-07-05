import {IUser} from "engraved-shared/dist";
import {Express} from "express";
import {Request} from "express-serve-static-core";
import {Db} from "mongodb";
import {DbService} from "../db/DbService";

export abstract class BaseController {
    protected constructor(app: Express, private db: Db) {
    }

    protected createDbService(req: Request): DbService {
        return new DbService(this.db, req.user as IUser);
    }
}