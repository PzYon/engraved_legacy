import { IItem, ItemSearchQuery, IUser } from "engraved-shared";
import { Express } from "express";
import { Request, Response } from "express-serve-static-core";
import { Db } from "mongodb";
import { BaseAuthenticatedController } from "./BaseAuthenticatedController";

export class ItemController extends BaseAuthenticatedController {
  public constructor(app: Express, db: Db) {
    super(app, db);

    this.authenticatedGet("/items", this.searchItems);
    this.authenticatedGet("/items/:itemId", this.getItemById);
    this.authenticatedPatch("/items/:itemId", this.updateItem);
    this.authenticatedPost("/items", this.insertItem);
  }

  private insertItem = (req: Request, res: Response): void => {
    this.createDbService(req)
      .insertItem(req.body)
      .then((item: IItem) => res.send(item));
  };

  private updateItem = (req: Request, res: Response): void => {
    this.createDbService(req)
      .updateItem(req.params.itemId, req.body)
      .then((item: IItem) => res.send(item));
  };

  private getItemById = (req: Request, res: Response): void => {
    this.createDbService(req)
      .getItemById(req.params.itemId)
      .then((item: IItem) => res.send(item));
  };

  private searchItems = (req: Request, res: Response): void => {
    this.createDbService(req)
      .getItems(new ItemSearchQuery(req.query.q, req.query.keywords))
      .then((items: IItem[]) => res.send(items));
  };
}
