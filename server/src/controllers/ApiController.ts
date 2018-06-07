import {Express} from "express";
import {Request, Response} from "express-serve-static-core";
import {Db} from "mongodb";
import {IItem, IKeyword, ItemSearchQuery} from "engraved-shared/dist";
import {DbService} from "../db/DbService";

export class ApiController {

    private dbService: DbService;

    public constructor(app: Express, db: Db) {
        this.dbService = new DbService(db);

        app.get("/items", this.searchItems);
        app.post("/items", this.addItem);
        app.get("/keywords", this.searchKeywords);
    }

    private addItem = (req: Request, res: Response): any => {
        this.dbService
            .insertItem(req.body)
            .then((item: IItem) => res.send(item));
    };

    private searchItems = (req: Request, res: Response): any => {
        this.dbService
            .getItems(new ItemSearchQuery(req.query.q, req.query.keywords))
            .then((items: IItem[]) => res.send(items));
    };

    private searchKeywords = (req: Request, res: Response): any => {
        this.dbService
            .getKeywords(req.query.q)
            .then((keywords: IKeyword[]) => res.send(keywords));
    };

}