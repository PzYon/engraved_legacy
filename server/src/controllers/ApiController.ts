import {IItem, IKeyword, ItemSearchQuery, IUser} from "engraved-shared/dist";
import {Express} from "express";
import {Request, Response} from "express-serve-static-core";
import {Db} from "mongodb";
import passport from "passport";
import {bootstrapAuthentication} from "../authentication/bootstrapAuthentication";
import {DbService} from "../db/DbService";

export class ApiController {

    public constructor(app: Express, private db: Db) {
        bootstrapAuthentication(app, new DbService(db, null));

        app.get("/items", passport.authenticate(['jwt'], {session: false}), this.searchItems);
        app.get("/items/:itemId", passport.authenticate(['jwt'], {session: false}), this.getItemById);
        app.patch("/items/:itemId", passport.authenticate(['jwt'], {session: false}), this.updateItem);
        app.post("/items", passport.authenticate(['jwt'], {session: false}), this.insertItem);
        app.get("/keywords", passport.authenticate(['jwt'], {session: false}), this.searchKeywords);
        app.get("/users/me", passport.authenticate(['jwt'], {session: false}), this.getCurrentUser);
    }

    private createDbService(req: Request): DbService {
        return new DbService(this.db, req.user as IUser);
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

    private searchKeywords = (req: Request, res: Response): void => {
        this.createDbService(req)
            .searchKeywords(req.query.q)
            .then((keywords: IKeyword[]) => res.send(keywords));
    };

    private getCurrentUser = (req: Request, res: Response): void => {
        res.send(req.user);
    };

}