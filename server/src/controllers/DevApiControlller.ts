import {IItem, IUser} from "engraved-shared/dist";
import {Express} from "express";
import {Request, Response} from "express-serve-static-core";
import {Db, DeleteWriteOpResultObject} from "mongodb";
import Config from "../Config";
import {DbService} from "../db/DbService";
import {createKnownItems} from "../helpers/createKnownItems";
import {createRandomItems} from "../helpers/createRandomItems";

export class DevApiController {

    public constructor(app: Express, private db: Db) {
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

    private addItems = (req: Request, res: Response): any => {
        new DbService(this.db, null).ensureUser({
                                                    displayName: "Markus Doggweiler",
                                                    image: "https://lh5.googleusercontent.com/-R-eoewIwKTs/AAAAAAAAAAI/AAAAAAAAASg/LhdVPDRyOcg/photo.jpg?sz=50",
                                                    mail: "markus.doggweiler@gmail.com",
                                                })
                                    .then((user: IUser) => {
                                        new DbService(this.db, user).insertItems(...createRandomItems(10, user),
                                                                                 ...createKnownItems(user))
                                                                    .then((items: IItem[]) => res.send(items))
                                    });
    };
}