import { IKeyword } from "engraved-shared";
import { Express } from "express";
import { Request } from "express-serve-static-core";
import { Db } from "mongodb";
import { BaseAuthenticatedController } from "./BaseAuthenticatedController";

export class KeywordController extends BaseAuthenticatedController {
  public constructor(app: Express, db: Db) {
    super(app, db);

    this.authenticatedGet("/keywords", this.searchKeywords);
  }

  private searchKeywords = (req: Request): Promise<IKeyword[]> => {
    return this.createDbService(req).searchKeywords(req.query.q);
  };
}
