import {Express} from "express";
import {Request, Response} from "express-serve-static-core";
import {Db} from "mongodb";
import passport from "passport";
import {BaseController} from "./BaseController";

export abstract class BaseAuthenticatedController extends BaseController {
    protected constructor(private app: Express, db: Db) {
        super(app, db);
    }

    private static authenticate(): any {
        return passport.authenticate(['jwt'], {session: false});
    }

    protected authenticatedGet(url: string, callback: (req: Request, res: Response) => void) {
        this.app
            .route(url)
            .get(BaseAuthenticatedController.authenticate(), callback);
    }

    protected authenticatedPatch(url: string, callback: (req: Request, res: Response) => void) {
        this.app
            .route(url)
            .patch(BaseAuthenticatedController.authenticate(), callback);
    }

    protected authenticatedPost(url: string, callback: (req: Request, res: Response) => void) {
        this.app
            .route(url)
            .post(BaseAuthenticatedController.authenticate(), callback);
    }
}
