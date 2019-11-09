import { IItem, IUser } from "engraved-shared";
import { Express } from "express";
import { Request, Response } from "express-serve-static-core";
import { Db, DeleteWriteOpResultObject } from "mongodb";
import Config from "../Config";
import { DbService } from "../DbService";
import { createKnownItems } from "../helpers/createKnownItems";
import { createRandomItems } from "../helpers/createRandomItems";

export class DevApiController {
  public constructor(app: Express, private db: Db) {
    app.route("/dev/add/items").get(this.addItems);

    app.route("/dev/clear/items").get((req: Request, res: Response): any => {
      return db
        .collection(Config.db.collections.items)
        .deleteMany({})
        .then((i: DeleteWriteOpResultObject) => res.send(i.result));
    });

    app.route("/dev/clear/keywords").get((req: Request, res: Response): any => {
      return db
        .collection(Config.db.collections.items)
        .deleteMany({})
        .then((i: DeleteWriteOpResultObject) => res.send(i.result));
    });
  }

  private addItems = (req: Request, res: Response): any => {
    new DbService(this.db, null)
      .ensureUser({
        displayName: "Markus Doggweiler",
        image:
          "https://lh5.googleusercontent.com/-R-eoewIwKTs/AAAAAAAAAAI/AAAAAAAAASg/LhdVPDRyOcg/photo.jpg?sz=50",
        mail: "markus.doggweiler@gmail.com",
        memberSince: undefined
      })
      .then((user: IUser) => {
        new DbService(this.db, user)
          .insertItems(
            ...createRandomItems(10, user),
            ...createKnownItems(user)
          )
          .then((items: IItem[]) => res.send(items));
      });
  };
}
