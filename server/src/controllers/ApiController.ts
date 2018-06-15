import {IItem, IKeyword, ItemSearchQuery} from "engraved-shared/dist";
import {Express} from "express";
import {Request, Response} from "express-serve-static-core";
import {Db} from "mongodb";
import {DbService} from "../db/DbService";

export class ApiController {

    private dbService: DbService;

    public constructor(app: Express, db: Db) {
        this.dbService = new DbService(db);

        app.get("/items", this.searchItems);
        app.get("/items/:itemId", this.getItemById);
        app.patch("/items/:itemId", this.updateItem);
        app.post("/items", this.insertItem);
        app.get("/keywords", this.searchKeywords);
    }

    private insertItem = (req: Request, res: Response): any => {
        this.dbService
            .insertItem(req.body)
            .then((item: IItem) => res.send(item));
    };

    private updateItem = (req: Request, res: Response): any => {
        this.dbService
            .updateItem(req.params.itemId, req.body)
            .then((item: IItem) => res.send(item));
    };

    private getItemById = (req: Request, res: Response): any => {
        this.dbService
            .getItemById(req.params.itemId)
            .then((item: IItem) => res.send(item));
    };

    private searchItems = (req: Request, res: Response): any => {
        this.dbService
            .getItems(new ItemSearchQuery(req.query.q, req.query.keywords))
            .then((items: IItem[]) => res.send(items));
    };

    private searchKeywords = (req: Request, res: Response): any => {
        this.dbService
            .searchKeywords(req.query.q)
            .then((keywords: IKeyword[]) => res.send(keywords));
    };

}