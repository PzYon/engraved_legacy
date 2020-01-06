import { IItem, ItemSearchQuery } from "engraved-shared";
import { Express } from "express";
import { IRequest } from "../IRequest";
import { HttpAction, registerRoute } from "./routerHelpers";

export const registerItemRoutes = (app: Express) => {
  registerRoute(
    app,
    "/items",
    HttpAction.Get,
    (req: IRequest): Promise<IItem[]> => {
      const query = ItemSearchQuery.fromObject(req.query);
      return req.serviceFactory.createDbService().getItems(query);
    }
  );

  registerRoute(
    app,
    "/items",
    HttpAction.Post,
    (req: IRequest): Promise<IItem> =>
      req.serviceFactory.createDbService().insertItem(req.body)
  );

  registerRoute(
    app,
    "/items/:itemId",
    HttpAction.Get,
    (req: IRequest): Promise<IItem> =>
      req.serviceFactory.createDbService().getItemById(req.params.itemId)
  );

  registerRoute(
    app,
    "/items/:itemId",
    HttpAction.Patch,
    (req: IRequest): Promise<IItem> =>
      req.serviceFactory
        .createDbService()
        .updateItem(req.params.itemId, req.body)
  );

  registerRoute(
    app,
    "/items/:itemId",
    HttpAction.Delete,
    (req: IRequest): Promise<any> =>
      req.serviceFactory.createDbService().deleteItem(req.params.itemId)
  );
};
