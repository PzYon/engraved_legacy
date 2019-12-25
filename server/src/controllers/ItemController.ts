import { IItem, ItemSearchQuery } from "engraved-shared";
import { Express } from "express";
import { Request, Response } from "express-serve-static-core";
import { Db } from "mongodb";
import { BaseAuthenticatedController } from "./BaseAuthenticatedController";

export class ItemController extends BaseAuthenticatedController {
  public constructor(app: Express, db: Db) {
    super(app, db);

    this.authenticatedGet("/items", this.searchItems);
    this.authenticatedPost("/items", this.insertItem);
    this.authenticatedGet("/items/:itemId", this.getItemById);
    this.authenticatedPatch("/items/:itemId", this.updateItem);
    this.authenticatedDelete("/items/:itemId", this.deleteItem);
  }

  private insertItem = (req: Request, res: Response): void => {
    this.createDbService(req)
      .insertItem(req.body)
      .then((item: IItem) => res.send(item));
  };

  private deleteItem = (req: Request, res: Response): void => {
    this.createDbService(req)
      .deleteItem(req.params.itemId)
      .then((result: any) => res.send(result));
  };

  private updateItem = (req: Request, res: Response): void => {
    this.createDbService(req)
      .updateItem(req.params.itemId, req.body)
      .then((item: IItem) => res.send(item));
  };

  private getItemById = (req: Request, res: Response): void => {
    this.createDbService(req)
      .getItemById(req.params.itemId)
      .then((item: IItem) => {
        if (item) {
          res.send(item);
        } else {
          res.statusCode = 404;
          res.send();
        }
      });
  };

  private searchItems = (req: Request, res: Response): void => {
    const query = ItemSearchQuery.fromObject(req.query);

    this.createDbService(req)
      .getItems(query)
      .then((items: IItem[]) => res.send(items));
  };
}
