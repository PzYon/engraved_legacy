import {Express} from "express";
import {Request, Response} from "express-serve-static-core";
import {Db, DeleteWriteOpResultObject} from "mongodb";
import {IItem} from "engraved-shared/dist";
import Config from "../Config";
import {DbService} from "../db/DbService";
import {createKnownItems} from "../helpers/createKnownItems";
import {createRandomItems} from "../helpers/createRandomItems";

export class DevApiController {

    private dbService: DbService;

    private addItems = (req: Request, res: Response): any => {
        this.dbService
            .insertItems(...createRandomItems(10), ...createKnownItems())
            .then((items: IItem[]) => res.send(items))
    };

    public constructor(app: Express, db: Db) {
        this.dbService = new DbService(db);

        app.get("/dev/add/items", this.addItems);

        app.get("/dev/clear/items", (req: Request, res: Response): any => {
            return db.collection(Config.db.collections.items)
                     .deleteMany({})
                     .then((i: DeleteWriteOpResultObject) => res.send(i.result));
        });

        app.get("/dev/clear/keywords", (req: Request, res: Response): any => {
            return db.collection(Config.db.collections.items)
                     .deleteMany({})
                     .then((i: DeleteWriteOpResultObject) => res.send(i.result));
        });
    }
}