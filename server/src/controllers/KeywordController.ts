import {Express} from "express";
import {Request, Response} from "express-serve-static-core";
import {Db} from "mongodb";
import {IKeyword} from "../../../shared/dist";
import {BaseAuthenticatedController} from "./BaseAuthenticatedController";

export class KeywordController extends BaseAuthenticatedController {
    public constructor(app: Express, db: Db) {
        super(app, db);

        this.authenticatedGet("/keywords", this.searchKeywords);
    }

    private searchKeywords = (req: Request, res: Response): void => {
        this.createDbService(req)
            .searchKeywords(req.query.q)
            .then((keywords: IKeyword[]) => res.send(keywords));
    };
}
