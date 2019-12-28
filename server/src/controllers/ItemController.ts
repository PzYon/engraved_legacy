import { IItem, ItemSearchQuery } from "engraved-shared";
import { Express } from "express";
import { Request } from "express-serve-static-core";
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

  private insertItem = (req: Request): Promise<IItem> => {
    return this.createDbService(req).insertItem(req.body);
  };

  private deleteItem = (req: Request): Promise<any> => {
    return this.createDbService(req).deleteItem(req.params.itemId);
  };

  private updateItem = (req: Request): Promise<IItem> => {
    return this.createDbService(req).updateItem(req.params.itemId, req.body);
  };

  private getItemById = (req: Request): Promise<IItem> => {
    return this.createDbService(req).getItemById(req.params.itemId);
  };

  private searchItems = (req: Request): Promise<IItem[]> => {
    const query = ItemSearchQuery.fromObject(req.query);

    return this.createDbService(req).getItems(query);
  };
}
